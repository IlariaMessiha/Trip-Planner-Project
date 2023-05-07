import { Injectable } from "@nestjs/common";
import { flow } from "src/data/ChatbotFlow";
import {
    getFieldFilters,
    replaceDynamicValueInFilter,
    toAttractionsFilter,
    toRestaurantsFilter,
} from "src/helpers/filtersHelper";
import { MappingDtos } from "src/helpers/mappingDtos";
import { PrismaService } from "src/prisma.service";

import {
    TChatbotFilter,
    TChatbotFlow,
    TChatbotQuestion,
    TChatbotSubmission,
} from "src/types/TChatbot";
import { AttractionDto } from "src/types/dto/common/AttractionDto";

import { GetDashboardResponseDto } from "src/types/dto/dashboard/GetDashboardResponseDto";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";
import { GetFilteredAttractionAndRestaurantsDto as GetFilteredAttractionAndRestaurantsDto } from "src/types/dto/trips/GetFilteredAttractionAndRestaurantsDto";
import { RestaurantDto } from "src/types/dto/common/RestaurantDto";
import { TripDto } from "src/types/dto/common/TripDto";
import { TripItemDto } from "src/types/dto/common/TripItemDto";
import { pickBy } from "lodash";

@Injectable()
export class CommonService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}
    async findDashboardContent(): Promise<GetDashboardResponseDto> {
        const cities = await this.prisma.city.findMany({
            include: {
                country: true,
                directus_files: true,
            },
        });
        const attractions = await this.prisma.attraction.findMany({
            where: {
                type: "beach",
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });

        return {
            sections: [
                {
                    title: "Where to go right now",
                    subtitle: "Spots at the top of travelers'must-go lists",
                    items: cities.map(city => {
                        return {
                            type: "city",
                            value: this.mappingDtos.mapCityToDto(
                                city,
                                city.directus_files,
                                this.mappingDtos.mapCountryToDto(city.country)
                            ),
                        };
                    }),
                },
                {
                    title: "Top activities for beach lovers",
                    subtitle: "Recommended based on your activity",
                    items: attractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: this.mappingDtos.mapAttractionToDto(
                                attraction,
                                attraction.directus_files
                            ),
                        };
                    }),
                },
            ],
        };
    }
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

    deduceFiltersFromSubmissions(submissions: TChatbotSubmission[]) {
        return submissions.map(submission => {
            const question = flow.questions.find(
                question => question.code === submission.questionCode
            );

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
        });
    }
    async findFilteredAttractionAndRestaurants(
        filters: TChatbotFilter[]
    ): Promise<GetFilteredAttractionAndRestaurantsDto> {
        const fieldFilters: TChatbotFilter[] = getFieldFilters(filters);
        const attractions = await this.prisma.attraction.findMany({
            where: {
                AND: toAttractionsFilter(fieldFilters),
            },
            include: {
                directus_files: true,
            },
        });
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                AND: toRestaurantsFilter(fieldFilters),
            },
            include: {
                directus_files: true,
            },
        });
        console.log(fieldFilters);
        return {
            attractions: attractions.map(attraction => {
                return this.mappingDtos.mapAttractionToDto(attraction, attraction.directus_files);
            }),
            restaurants: restaurants.map(restaurant => {
                return this.mappingDtos.mapRestaurantToDto(restaurant, restaurant.directus_files);
            }),
        };
    }
    // async createTrip(
    //     attractionAndRestaurant: GetFilteredAttractionAndRestaurantsDto,
    //     globalFilters: TChatbotFilter[]
    // ): Promise<TripDto> {
    //     const attractions: AttractionDto[] = attractionAndRestaurant.attractions;
    //     const restaurants: RestaurantDto[] = attractionAndRestaurant.restaurants;
    //     restaurants.map(restaurant => {});
    // }
}
