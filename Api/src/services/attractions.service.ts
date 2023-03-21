import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, directus_files, user } from "@prisma/client";
import { GetAttractionResponseDto } from "src/types/dto/attractions/GetAttractionResponseDto";
import { AttractionDto } from "src/types/dto/common/AttractionDto";
import { MappingDtos } from "src/helpers/mappingDtos";

@Injectable()
export class AttractionsService {
    constructor(private prisma: PrismaService, private mappingDto: MappingDtos) {}
    async findAttractions(): Promise<Attraction[]> {
        const attractions = await this.prisma.attraction.findMany({
            include: {
                directus_files: true,
            },
        });

        return attractions.map(({ directus_files, ...attraction }) => {
            if (!directus_files) return attraction;
            return {
                ...attraction,
                attraction_image: `http://localhost:8055/assets/${directus_files.filename_disk}`,
            };
        });
    }

    async findAttraction(id: number): Promise<GetAttractionResponseDto> {
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: id,
            },
            include: {
                attraction_review: true,
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
            },
        });
        return {
            attraction: this.mappingDto.mapAttractionToDto(attraction, attraction.directus_files),
            reviews: attraction.attraction_review.map(review => {
                return this.mappingDto.mapReviewToDto(review);
            }),
            city: this.mappingDto.mapCityToDto(city, city.directus_files),
        };
    }

    async findReviewsForAttraction(id): Promise<attraction_review[]> {
        const idNumber = Number(id);
        const attractionReviews = await this.prisma.attraction_review.findMany({
            where: {
                attraction_id: idNumber,
            },
        });
        return attractionReviews;
    }

    async findCityAttractions(id: string): Promise<Attraction[]> {
        const idNumber = Number(id);

        const attractions = await this.prisma.attraction.findMany({
            where: {
                city_id: idNumber,
            },
        });
        return attractions;
    }

    /** Private */
}
