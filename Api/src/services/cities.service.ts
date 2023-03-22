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
            city: this.mappingDtos.mapCityToDto(city, city.directus_files),
            sections: [
                {
                    title: "Do",
                    subtitle: `Places to see, ways to wander, and signature experiences that define ${city.label}`,
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
                            value: this.mappingDtos.mapRestaurantToDto(
                                restaurant,
                                restaurant.directus_files
                            ),
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
