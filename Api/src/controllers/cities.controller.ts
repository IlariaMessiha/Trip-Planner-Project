import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CityService } from "src/services/cities.service";
import { TestService } from "src/services/test.service";

@Controller("/cities")
export class CitiesController {
    constructor(private configService: ConfigService, private cityService: CityService) {
        console.log(configService.get("IMAGES_PATH"));
    }
    @Get("")
    getCities() {
        return this.cityService.findCities();
    }
    @Get("/:id")
    getCityById(@Param("id", ParseIntPipe) id: number) {
        return this.cityService.findCity(id);
    }
}
