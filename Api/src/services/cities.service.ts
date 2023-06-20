import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { city } from "@prisma/client";
import { GetCityResponseDto } from "src/types/dto/cities/GetCityResponseDto";
import {
    MappingDtos,
    mapAttractionToDto,
    mapCityToDto,
    mapCountryToDto,
    mapRestaurantToDto,
} from "src/helpers/MappingDtos";

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
                country: true,
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
        const hotels = await this.prisma.hotel.findMany({
            where: {
                city_id: id,
            },
            include: {
                directus_files: true,
            },
        });
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                city_id: id,
            },
            include: {
                directus_files: true,
            },
        });

        return {
            city: mapCityToDto(city, city.directus_files, mapCountryToDto(city.country)),
            sections: [
                {
                    title: "Do",
                    subtitle: `Places to see, ways to wander, and signature experiences that define ${city.label}`,
                    items: attractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: mapAttractionToDto(attraction, attraction.directus_files),
                        };
                    }),
                },
                {
                    title: "Stay",
                    subtitle: `A mix of the charming, iconic, and modern in ${city.label}`,
                    items: hotels.map(hotel => {
                        return {
                            type: "hotel",
                            value: this.mappingDtos.mapHotelToDto(hotel, hotel.directus_files),
                        };
                    }),
                },
                {
                    title: "Eat",
                    subtitle: `Quintessential ${city.label} restaurants, bars, and beyond.`,
                    items: restaurants.map(restaurant => {
                        return {
                            type: "restaurant",
                            value: mapRestaurantToDto(restaurant, restaurant.directus_files),
                        };
                    }),
                },
            ],
        };
    }

    async findCities(): Promise<city[]> {
        const cities = await this.prisma.city.findMany();
        return cities;
    }
}
