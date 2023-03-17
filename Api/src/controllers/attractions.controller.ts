import { Controller, Get, Param } from "@nestjs/common";
import { AttractionsService } from "src/services/attractions.service";

@Controller("/attractions")
export class AttractionsController {
    constructor(private attractionsService: AttractionsService) {}

    @Get("/:id")
    getAttractionById(@Param("id") id: string) {
        return this.attractionsService.findAttractionPage(id);
    }

    @Get("")
    getAttractions() {
        return this.attractionsService.findAttractions();
    }

    @Get("/:id/reviews")
    getReviewsForAttraction(@Param("id") id: string) {
        return this.attractionsService.findReviewsForAttraction(id);
    }
}
