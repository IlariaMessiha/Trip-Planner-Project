import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Attraction, attraction_review, city, country, user } from "@prisma/client";

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) {}

    async findReviewById(id: string): Promise<attraction_review> {
        const idNumber = Number(id);
        const review = await this.prisma.attraction_review.findUnique({
            where: {
                id: idNumber,
            },
        });
        return review;
    }
}
