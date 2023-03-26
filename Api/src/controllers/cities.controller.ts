import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CityService } from "src/services/cities.service";

@Controller("/cities")
export class CitiesController {
    constructor(private configService: ConfigService, private cityService: CityService) {}
    @Get("")
    getCities() {
        return this.cityService.findCities();
    }
    @Get("/:id")
    getCityById(@Param("id", ParseIntPipe) id: number) {
        return this.cityService.findCity(id);
    }
}
