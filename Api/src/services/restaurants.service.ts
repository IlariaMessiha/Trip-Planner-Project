import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { GetRestaurantResponseDto } from "src/types/dto/restaurants/GetRestaurantResponseDto";
import { MappingDtos, mapUserToDto } from "src/helpers/mappingDtos";

@Injectable()
export class RestaurantsService {
    constructor(private prisma: PrismaService, private mappingDto: MappingDtos) {}

    async findRestaurant(id: number): Promise<GetRestaurantResponseDto> {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: {
                id: id,
            },
            include: {
                directus_files: true,
                city: true,
            },
        });
        const city = await this.prisma.city.findUnique({
            where: {
                id: restaurant.city_id,
            },
            include: {
                directus_files: true,
                country: true,
            },
        });
        const reviews = await this.prisma.restaurant_review.findMany({
            where: {
                restaurant_id: id,
            },
            include: {
                user: true,
            },
        });
        return {
            restaurant: this.mappingDto.mapRestaurantToDto(restaurant, restaurant.directus_files),
            reviews: reviews.map(review => {
                return this.mappingDto.mapRestaurantReviewToDto(review, mapUserToDto(review.user));
            }),
            city: this.mappingDto.mapCityToDto(
                city,
                city.directus_files,
                this.mappingDto.mapCountryToDto(city.country)
            ),
        };
    }

    /** Private */
}
