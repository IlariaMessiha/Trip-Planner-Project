import { Controller, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";

@Controller("/reviews")
export class ReviewsController {
    constructor(private testService: TestService) {}

    @Get("/:id")
    getReviewById(@Param("id") id: string) {
        return this.testService.findReviewById(id);
    }
    // TODO remove this endpoint, use getReviewById instead
    @Get("/:id/user")
    getUserForReview(@Param("id") id: string) {
        return this.testService.findUserForReview(id);
    }
}
