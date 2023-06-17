import { Injectable } from "@nestjs/common";
import { chain, cloneDeep, find, last, mapValues, range, sortBy } from "lodash";
import { flow } from "src/data/ChatbotFlow";
import { MappingDtos, mapAttractionToDto, mapRestaurantToDto } from "src/helpers/MappingDtos";
import {
    replaceDynamicValueInFilter,
    toAttractionsFilter,
    toRestaurantsFilter,
} from "src/helpers/filtersHelper";
import { PrismaService } from "src/prisma.service";
import { AttractionWithImage } from "src/types/AttractionWithImage";
import { RestaurantWithTags } from "src/types/RestaurantWithTags";
import {
    TChatbotFilter,
    TChatbotFlow,
    TChatbotQuestion,
    TChatbotQuestionSearchTarget,
    TChatbotSubmission,
} from "src/types/TChatbot";
import { TripItemDto, TripItemsByDayDto } from "src/types/dto/common/TripItemDto";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";
import * as dayjs from "dayjs";
import { AttractionDto } from "src/types/dto/common/AttractionDto";

@Injectable()
export class TripService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}
    async findDestinations(): Promise<GetDestinationNameDto> {
        const cities = await this.prisma.city.findMany();
        const countries = await this.prisma.country.findMany();
        return {
            citiesName: cities.map(city => {
                return city.label;
            }),
            countriesName: countries.map(country => {
                return country.label;
            }),
        };
    }
    findChatbotFlow(): TChatbotFlow {
        return flow;
    }

    deduceFiltersByTarget(submissions: TChatbotSubmission[]) {
        return submissions.reduce((filtersByTarget, submission) => {
            const question = flow.questions.find(
                question => question.code === submission.questionCode
            );
            const filter = this.deduceFilterFromSubmission(submission, question);
            if (filter && Object.keys(filter).length > 0) {
                question.searchTargets.forEach(target => {
                    filtersByTarget[target] = [...(filtersByTarget[target] || []), filter];
                });
            }
            return filtersByTarget;
        }, {} as Record<TChatbotQuestionSearchTarget, TChatbotFilter[]>);
    }

    deduceFilterFromSubmission(submission: TChatbotSubmission, question: TChatbotQuestion) {
        if (question.type === "text") {
            return replaceDynamicValueInFilter(question.filter || {}, submission.value);
        }
        if (question.answers) {
            const selectedAnswer = question.answers.find(
                answer => answer.code === submission.value || answer.text === submission.value
            );
            if (selectedAnswer.filter) {
                return selectedAnswer.filter;
            }
        }
    }

    async findAttractionPool(filters: TChatbotFilter[]): Promise<AttractionWithImage[]> {
        const attractions = await this.prisma.attraction.findMany({
            where: {
                AND: toAttractionsFilter(filters),
            },
            include: {
                directus_files: true,
            },
        });

        return attractions.map(attraction => {
            return { attraction: attraction, image: attraction.directus_files };
        });
    }

    async findRestaurantPool(filters: TChatbotFilter[]): Promise<RestaurantWithTags[]> {
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                AND: toRestaurantsFilter(filters),
            },
            include: {
                directus_files: true,
                restaurant_tag: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return restaurants.map(restaurant => {
            return {
                restaurant: restaurant,
                tags: restaurant.restaurant_tag.map(tag => {
                    return tag.tag;
                }),
                image: restaurant.directus_files,
            };
        });
    }
    createTripItemsPerDay(globalFilters: TChatbotFilter[]) {
        const durationFilter = find(globalFilters, "tripDuration");
        const nbDays = parseInt(durationFilter.tripDuration.equals) || 5;

        // Here we assume the start and end dates, because the user did not specify them.
        // The user could change them in the future.
        const startDate = dayjs().add(1, "week");
        const endDate = dayjs(startDate).add(nbDays - 1, "day");
        const tripItemsPerDay: TripItemsByDayDto = chain(range(nbDays))
            .map(i => startDate.add(i, "day").toISOString())
            .keyBy(date => date)
            .mapValues(() => [])
            .value();

        return {
            tripItemsPerDay,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };
    }

    addRestaurantTripItem(
        restaurantsPool: RestaurantWithTags[],
        tripItemsByDay: TripItemsByDayDto,
        startDate: string,
        meal: "breakfast" | "dinner"
    ) {
        const tagByMeal = {
            breakfast: "food-meal:breakfast",
            dinner: "food-meal:dinner",
        };

        const breakfastRestaurants = restaurantsPool.filter(restaurant =>
            restaurant.tags.some(tag => tag.code === tagByMeal[meal])
        );

        const selectOne = (date: string) => {
            const index = dayjs(date).diff(startDate, "day");
            const pool = breakfastRestaurants.length > 0 ? breakfastRestaurants : restaurantsPool;
            return pool[index % pool.length];
        };

        return mapValues(tripItemsByDay, (items, date) => {
            const breakfastRestaurant = selectOne(date);
            const previousItem = last(items);

            const previousItemDuration = previousItem
                ? (previousItem.value as AttractionDto).suggestedDuration || 2
                : 0;

            const dateTime = previousItem
                ? dayjs(previousItem.dateTime).add(previousItemDuration, "hour").toISOString()
                : dayjs(date).hour(8).minute(0).second(0).toISOString();

            return [
                ...items,
                {
                    dateTime,
                    type: "restaurant" as TripItemDto["type"],
                    value: mapRestaurantToDto(
                        breakfastRestaurant.restaurant,
                        breakfastRestaurant.image
                    ),
                },
            ];
        });
    }

    addAttractions(attractionsPool: AttractionWithImage[], tripItemsPerDay: TripItemDto[][]) {
        const newTripItemsPerDay = cloneDeep(tripItemsPerDay);

        sortBy(attractionsPool, "suggested_duration").reverse();
        newTripItemsPerDay.map((items, i) => {
            items.push({
                dateTime: "9:00",
                type: "attraction",
                value: mapAttractionToDto(attractionsPool[i].attraction, attractionsPool[i].image),
            });
        });
        return newTripItemsPerDay;
    }
}
