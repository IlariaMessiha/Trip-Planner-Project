import { Injectable } from "@nestjs/common";
import { mapAttractionToDto, MappingDtos, mapRestaurantToDto } from "src/helpers/MappingDtos";
import { PrismaService } from "src/prisma.service";

import { GetDashboardResponseDto } from "src/types/dto/dashboard/GetDashboardResponseDto";

@Injectable()
export class CommonService {
    dayjs = require("dayjs");
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}
    async findDashboardContent(): Promise<GetDashboardResponseDto> {
        const cities = await this.prisma.city.findMany({
            include: {
                country: true,
                directus_files: true,
            },
        });
        const beachAttractions = await this.prisma.attraction.findMany({
            where: {
                type: {
                    equals: "beach",
                    mode: "insensitive",
                },
                rating: {
                    gte: 4,
                },
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });
        const egyptReligiousAttractions = await this.prisma.attraction.findMany({
            where: {
                city: {
                    country: {
                        country_code: "egypt",
                    },
                },
                type: {
                    contains: "religious",
                    mode: "insensitive",
                },
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });
        const scenicAttractionInNice = await this.prisma.attraction.findMany({
            where: {
                city: {
                    city_code: "nice",
                },
                OR: [
                    {
                        type: {
                            contains: "scenic",
                            mode: "insensitive",
                        },
                    },
                    {
                        attraction_tag: {
                            some: {
                                tag: {
                                    code: {
                                        contains: "nature",
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });
        const hikeInNice = await this.prisma.attraction.findMany({
            where: {
                city: {
                    city_code: "nice",
                },
                attraction_tag: {
                    some: {
                        tag: {
                            code: {
                                equals: "hiking",
                            },
                        },
                    },
                },
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });
        const bestRestaurantsInCairo = await this.prisma.restaurant.findMany({
            where: {
                city: {
                    city_code: "cairo",
                },
                rating: {
                    gte: 4,
                },
            },
            include: {
                city: true,
                directus_files: true,
                restaurant_tag: true,
            },
        });

        return {
            sections: [
                {
                    title: "Taste of Cairo: Unveiling the City's Gastronomic Gems ",
                    subtitle: "From Timeless Classics to Exquisite Creations, Delight Your Palate.",
                    items: bestRestaurantsInCairo.map(restaurant => {
                        return {
                            type: "attraction",
                            value: mapRestaurantToDto(restaurant, restaurant.directus_files),
                        };
                    }),
                },
                {
                    title: "Explore Nature's French Riviera ",
                    subtitle: "Unveiling Hiking Gems on the Côte d'Azur",
                    items: hikeInNice.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
                {
                    title: "Nature's Haven: Serene Escapes in Nice, Côte d'Azur",
                    subtitle: "Where Scenic Beauty Flourishes and Nature Embraces",
                    items: scenicAttractionInNice.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
                {
                    title: "Beach Wonders: Exploring the World's Popular Coastal Gems",
                    subtitle: "Unveiling the Shores of Paradise, Where Beach Dreams Begin",
                    items: beachAttractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
                {
                    title: "Places to in Egypt ",
                    subtitle: "Go to these places for a close-up look at Egypt.",
                    items: egyptReligiousAttractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
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
            ],
        };
    }
}
