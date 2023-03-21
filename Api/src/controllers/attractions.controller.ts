import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AttractionsService } from "src/services/attractions.service";
import { GetAttractionResponseDto } from "src/types/dto/attractions/GetAttractionResponseDto";

@Controller("/attractions")
export class AttractionsController {
    constructor(private attractionsService: AttractionsService) {}

    @Get("/:id")
    getAttraction(@Param("id", ParseIntPipe) id: number): Promise<GetAttractionResponseDto> {
        return this.attractionsService.findAttraction(id);
    }

    @Get("")
    getAttractions() {
        return this.attractionsService.findAttractions();
    }
}
