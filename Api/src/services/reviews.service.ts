import { Injectable } from "@nestjs/common";
import { attraction_review } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

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
