import { Controller, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";

@Controller("/cities")
export class CitiesController {
    constructor(private configService: ConfigService, private testService: TestService) {
        console.log(configService.get("IMAGES_PATH"));
    }

    @Get("/:id/attractions")
    getCityAttractions(@Param("id") id: string) {
        return this.testService.findCityAttractions(id);
    }

    @Get("")
    getCities() {
        return this.testService.findCities();
    }
    @Get("/:id")
    getCityById(@Param("id") id: string) {
        return this.testService.findCityPage(id);
    }

    @Get("/:id/country")
    getCountryForCity(@Param("id") id: string) {
        return this.testService.findCountryForCity(id);
    }
}
