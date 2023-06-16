import { Injectable } from "@nestjs/common";
import { mapAttractionToDto, MappingDtos } from "src/helpers/MappingDtos";
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
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });
        const egyptAttractions = await this.prisma.attraction.findMany({
            where: {
                city: {
                    country: {
                        country_code: "egypt",
                    },
                },
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
                    title: "Places to in Egypt ",
                    subtitle: "Go to these places for a close-up look at Egypt.",
                    items: egyptAttractions.map(attraction => {
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
                {
                    title: "Top activities for beach lovers",
                    subtitle: "Recommended based on your activity",
                    items: beachAttractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
            ],
        };
    }
}
