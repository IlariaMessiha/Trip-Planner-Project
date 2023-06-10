import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
// import { GetRestaurantResponseDto } from "src/types/dto/restaurants/GetRestaurantResponseDto";
import { GetHotelResponseDto } from "src/types/dto/hotels/GetHotelResponseDto";
import { MappingDtos, mapUserToDto } from "src/helpers/mappingDtos";

@Injectable()
export class HotelsService {
    constructor(private prisma: PrismaService, private mappingDto: MappingDtos) {}

    async findHotel(id: number): Promise<GetHotelResponseDto> {
        const hotel = await this.prisma.hotel.findUnique({
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
                id: hotel.city_id,
            },
            include: {
                directus_files: true,
                country: true,
            },
        });
        const reviews = await this.prisma.hotel_review.findMany({
            where: {
                hotel_id: id,
            },
            include: {
                user: true,
            },
        });
        return {
            hotel: this.mappingDto.mapHotelToDto(hotel, hotel.directus_files),
            reviews: reviews.map(review => {
                return this.mappingDto.mapReviewToDto(review, mapUserToDto(review.user));
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
