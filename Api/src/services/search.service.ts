import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import {
    MappingDtos,
    mapAttractionToDto,
    mapCityToDto,
    mapCountryToDto,
    mapRestaurantToDto,
} from "src/helpers/MappingDtos";
import { SearchQuery, SearchResult } from "src/types/dto/search/searchDto";

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}

    async search(searchQuery: SearchQuery): Promise<SearchResult[]> {
        const attractions = await this.prisma.attraction.findMany({
            where: {
                OR: [
                    {
                        label: {
                            contains: searchQuery.label,
                            mode: "insensitive",
                        },
                    },
                    {
                        city: {
                            label: {
                                startsWith: searchQuery.label,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                directus_files: true,
            },
        });
        const cities = await this.prisma.city.findMany({
            where: {
                OR: [
                    {
                        label: {
                            startsWith: searchQuery.label,
                            mode: "insensitive",
                        },
                    },
                    {
                        country: {
                            label: {
                                startsWith: searchQuery.label,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                attraction: true,
                directus_files: true,
                country: true,
            },
        });
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                OR: [
                    {
                        label: {
                            contains: searchQuery.label,
                            mode: "insensitive",
                        },
                    },
                    {
                        city: {
                            label: {
                                startsWith: searchQuery.label,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                directus_files: true,
            },
        });
        const hotels = await this.prisma.hotel.findMany({
            where: {
                OR: [
                    {
                        label: {
                            contains: searchQuery.label,
                            mode: "insensitive",
                        },
                    },
                    {
                        city: {
                            label: {
                                startsWith: searchQuery.label,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                directus_files: true,
            },
        });

        const attractionItems: SearchResult[] = [];
        attractions.map(attraction => {
            attractionItems.push({
                item: mapAttractionToDto(attraction, attraction.directus_files),
                type: "Attraction",
            });
        });

        const cityItems: SearchResult[] = cities.map(city => {
            return {
                item: mapCityToDto(city, city.directus_files, mapCountryToDto(city.country)),
                type: "City",
            };
        });
        const restaurantItems: SearchResult[] = restaurants.map(restaurant => {
            return {
                item: mapRestaurantToDto(restaurant, restaurant.directus_files),
                type: "Restaurant",
            };
        });
        const hotelItems: SearchResult[] = hotels.map(hotel => {
            return {
                item: this.mappingDtos.mapHotelToDto(hotel, hotel.directus_files),
                type: "Hotel",
            };
        });
        if (!searchQuery.type) {
            return [...cityItems, ...attractionItems, ...restaurantItems, ...hotelItems];
        } else {
            const searchResults: SearchResult[] = [];
            searchQuery.type.map(type => {
                if (type === "Attraction") {
                    searchResults.push(...attractionItems);
                }
                if (type === "City") {
                    searchResults.push(...cityItems);
                }

                if (type === "Restaurant") {
                    searchResults.push(...restaurantItems);
                }
                if (type === "Hotel") {
                    searchResults.push(...hotelItems);
                }
            });
            return searchResults;
        }
    }
}
