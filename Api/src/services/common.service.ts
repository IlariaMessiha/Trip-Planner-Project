import { Injectable } from "@nestjs/common";
import { flow } from "src/data/ChatbotFlow";
import {
    getFieldFilters,
    replaceDynamicValueInFilter,
    toAttractionsFilter,
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
        // const restaurants = await this.prisma.restaurant.findMany({
        //     where: {
        //         AND: fieldFilters,
        //     },
        //     include: {
        //         directus_files: true,
        //     },
        // });
        console.log(fieldFilters);
        return {
            attractions: attractions.map(attraction => {
                return this.mappingDtos.mapAttractionToDto(attraction, attraction.directus_files);
            }),
            // restaurants: restaurants.map(restaurant => {
            //     return this.mappingDtos.mapRestaurantToDto(restaurant, restaurant.directus_files);
            // }),
            restaurants: [],
        };
    }
    //     async findFilteredAttractionAndRestaurants(
    //         filters: TChatbotFilter[]
    //     ): Promise<GetFilteredAttractionAndRestaurantsDto> {
    //         let destination: string;
    //         let minAge: number;
    //         const tags = [];
    //         const restaurantTags = [];
    //         let filteredAttractions = [];
    //         let filteredRestaurants: RestaurantDto[] = [];
    //         //TODO split filters

    //         // filters.map(filter => {
    //         //     if (filter.preferredDestination) {
    //         //         destination = filter.preferredDestination.eq;
    //         //     }
    //         //     if (filter.tags) {
    //         //         tags.push(filter.tags.in);
    //         //     }
    //         //     if (filter.minAge) {
    //         //         minAge = Number(filter.minAge.$lte);
    //         //     }
    //         // });
    //         // restaurantFilters.map(filter => {
    //         //     if (filter.tags) {
    //         //         restaurantTags.push(...filter.tags.$in);
    //         //     }
    //         // });
    //         console.log(filters);

    //         console.log(tags, "............", restaurantTags);
    //         await Promise.all(
    //             tags.map(async tag => {
    //                 const attractions = await this.prisma.attraction.findMany({
    //                     where: {
    //                         attraction_tag: {
    //                             some: {
    //                                 tag: {
    //                                     code: {
    //                                         in: tag,
    //                                         mode: "insensitive",
    //                                     },
    //                                 },
    //                             },
    //                         },

    //                         city: {
    //                             OR: [
    //                                 {
    //                                     label: {
    //                                         equals: destination,
    //                                         mode: "insensitive",
    //                                     },
    //                                 },
    //                                 {
    //                                     country: {
    //                                         label: {
    //                                             equals: destination,
    //                                             mode: "insensitive",
    //                                         },
    //                                     },
    //                                 },
    //                             ],
    //                         },
    //                         min_age: {
    //                             lte: minAge,
    //                         },
    //                     },
    //                     include: {
    //                         directus_files: true,
    //                     },
    //                 });

    //                 console.log(attractions, "------------", tag);
    //             })
    //         );

    //         const restaurants = await this.prisma.restaurant.findMany({
    //             where: {
    //                 retaurant_tag: {
    //                     some: {
    //                         tag: {
    //                             code: {
    //                                 in: restaurantTags,
    //                                 mode: "insensitive",
    //                             },
    //                         },
    //                     },
    //                 },

    //                 city: {
    //                     OR: [
    //                         {
    //                             label: {
    //                                 equals: destination,
    //                                 mode: "insensitive",
    //                             },
    //                         },
    //                         {
    //                             country: {
    //                                 label: {
    //                                     equals: destination,
    //                                     mode: "insensitive",
    //                                 },
    //                             },
    //                         },
    //                     ],
    //                 },
    //             },
    //             include: {
    //                 directus_files: true,
    //             },
    //         });
    //         filteredRestaurants.push(
    //             ...restaurants.map(restaurant => {
    //                 return this.mappingDtos.mapRestaurantToDto(restaurant, restaurant.directus_files);
    //             })
    //         );

    //         return {
    //             attractions: filteredAttractions,
    //             restaurants: restaurants.map(restaurant => {
    //                 return this.mappingDtos.mapRestaurantToDto(restaurant, restaurant.directus_files);
    //             }),
    //         };
    //     }
}
