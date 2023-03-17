import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from "@prisma/client";

@Injectable()
export class AttractionsService {
    constructor(private prisma: PrismaService) {}
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

    async findAttractionPage(id: string): Promise<Attraction> {
        const idNumber = Number(id);
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: idNumber,
            },
            include: {
                attraction_review: true,
            },
        });
        return attraction;
    }
    async findAttractionById(id: string): Promise<Attraction> {
        const idNumber = Number(id);
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: idNumber,
            },
        });
        return attraction;
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
}
