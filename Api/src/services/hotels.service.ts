import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
// import { GetRestaurantResponseDto } from "src/types/dto/restaurants/GetRestaurantResponseDto";
import { MappingDtos, mapCityToDto, mapCountryToDto } from "src/helpers/MappingDtos";
import { GetHotelResponseDto } from "src/types/dto/hotels/GetHotelResponseDto";

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

        return {
            hotel: this.mappingDto.mapHotelToDto(hotel, hotel.directus_files),
            city: mapCityToDto(city, city.directus_files, mapCountryToDto(city.country)),
        };
    }

    /** Private */
}
