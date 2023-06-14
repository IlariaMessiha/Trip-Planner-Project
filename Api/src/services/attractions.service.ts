import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { GetAttractionResponseDto } from "src/types/dto/attractions/GetAttractionResponseDto";
import {
    MappingDtos,
    mapAttractionReviewToDto,
    mapAttractionToDto,
    mapUserToDto,
} from "src/helpers/MappingDtos";

@Injectable()
export class AttractionsService {
    constructor(private prisma: PrismaService, private mappingDto: MappingDtos) {}

    async findAttraction(id: number): Promise<GetAttractionResponseDto> {
        const attraction = await this.prisma.attraction.findUnique({
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
                id: attraction.city_id,
            },
            include: {
                directus_files: true,
                country: true,
            },
        });
        const reviews = await this.prisma.attraction_review.findMany({
            where: {
                attraction_id: id,
            },
            include: {
                user: true,
                Attraction: true,
            },
        });
        return {
            attraction: mapAttractionToDto(attraction, attraction.directus_files),
            reviews: reviews.map(review => {
                return {
                    review: mapAttractionReviewToDto(
                        review,
                        mapUserToDto(review.user),
                        attraction.id
                    ),
                    type: "attractionReview",
                };
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
