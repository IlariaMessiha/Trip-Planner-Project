import { Controller, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";

@Controller("/attractions")
export class AttractionsController {
    constructor(private configService: ConfigService, private testService: TestService) {
        console.log(configService.get("IMAGES_PATH"));
    }

    @Get("/:id/city")
    getAttractionsForCity(@Param("id") id: string) {
        return this.testService.findAttractionForCity(id);
    }

    @Get("/:id")
    getAttractionById(@Param("id") id: string) {
        return this.testService.findAttractionPage(id);
    }

    @Get("")
    getAttractions() {
        return this.testService.findAttractions();
    }

    @Get("/:id/reviews")
    getReviewsForAttraction(@Param("id") id: string) {
        return this.testService.findReviewsForAttraction(id);
    }
}
