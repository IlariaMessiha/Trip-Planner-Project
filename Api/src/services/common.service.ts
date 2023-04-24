import { Injectable } from "@nestjs/common";
import { MappingDtos } from "src/helpers/mappingDtos";
import { PrismaService } from "src/prisma.service";
import { GetDashboardResponseDto } from "src/types/dto/dashboard/GetDashboardResponseDto";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";

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
}
