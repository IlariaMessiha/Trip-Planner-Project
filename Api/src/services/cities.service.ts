import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, directus_files, user } from "@prisma/client";
import { CityDto } from "src/types/dto/common/CityDto";
import { GetCityResponseDto } from "src/types/dto/cities/GetCityResponseDto";
import { MappingDtos } from "src/helpers/mappingDtos";

@Injectable()
export class CityService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}

    async findCity(id: number): Promise<GetCityResponseDto> {
        const city = await this.prisma.city.findUnique({
            where: {
                id: id,
            },
            include: {
                directus_files: true,
            },
        });
        const attractions = await this.prisma.attraction.findMany({
            where: {
                city_id: id,
            },
            include: {
                directus_files: true,
            },
        });
        return {
            city: this.mappingDtos.mapCityToDto(city, city.directus_files),
            attractions: attractions.map(attraction => {
                return this.mappingDtos.mapAttractionToDto(attraction, attraction.directus_files);
            }),
        };
    }

    async findCities(): Promise<city[]> {
        const cities = await this.prisma.city.findMany();
        return cities;
    }
}
