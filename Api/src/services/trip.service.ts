import { Injectable } from "@nestjs/common";
import { flow } from "src/data/ChatbotFlow";
import { MappingDtos } from "src/helpers/MappingDtos";
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
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";

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
            if (selectedAnswer?.filter) {
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
}
