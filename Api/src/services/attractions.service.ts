import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, directus_files, user } from "@prisma/client";
import { GetAttractionResponseDto } from "src/types/dto/attractions/GetAttractionResponseDto";
import { AttractionDto } from "src/types/dto/common/AttractionDto";

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

    async findAttraction(id: number): Promise<GetAttractionResponseDto> {
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: id,
            },
            include: {
                attraction_review: true,
                directus_files: true,
            },
        });
        return {
            attraction: this.mapAttractionToDto(attraction, attraction.directus_files),
        };
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

    /** Private */

    private mapAttractionToDto(attraction: Attraction, image: directus_files): AttractionDto {
        const long = attraction.long.toNumber();
        const lat = attraction.lat.toNumber();

        const mapLocation = lat && long ? { lat, long } : null;

        return {
            id: attraction.id,
            label: attraction.label,
            about: attraction.about,
            address: attraction.address,
            phone: attraction.phone,
            suggestedDuration: attraction.suggested_duration,
            entryFee: attraction.entry_fee.toNumber(),
            imageUrl: `http://localhost:8055/assets/${image.filename_disk}`,
            website: attraction.website,
            type: attraction.type,
            rating: attraction.rating,
            reservationLink: attraction.reservation_link,
            minAge: attraction.min_age,
            email: attraction.email,

            mapLocation: mapLocation,

            openingHours: {
                from: attraction.openning_hours_from.toISOString(),
                to: attraction.openning_hours_to.toISOString(),
            },
        };
    }
}
