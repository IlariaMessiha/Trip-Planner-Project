import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";

@Controller("")
export class TestController {
    constructor(private configService: ConfigService, private testService: TestService) {
        console.log(configService.get("IMAGES_PATH"));
    }
    @Get("/attractions/:id/city")
    getAttractionsForCity(@Param("id") id: string) {
        return this.testService.findAttractionForCity(id);
    }
    @Get("/cities/:id/attractions")
    getCityAttractions(@Param("id") id: string) {
        return this.testService.findCityAttractions(id);
    }
    @Get("attractions/:id")
    getAttractionById(@Param("id") id: string) {
        return this.testService.findAttractionById(id);
    }

    @Get("attractions")
    getAttractions() {
        return this.testService.findAttractions();
    }
    @Get("cities")
    getCities() {
        return this.testService.findCities();
    }
    @Get("cities/:id")
    getCityById(@Param("id") id: string) {
        return this.testService.findCityById(id);
    }

    @Get("countries/:id")
    getCountryById(@Param("id") id: string) {
        return this.testService.findCountryById(id);
    }

    @Get("cities/:id/country")
    getCountryForCity(@Param("id") id: string) {
        return this.testService.findCountryForCity(id);
    }
    @Get("attractions/:id/reviews")
    getReviewsForAttraction(@Param("id") id: string) {
        return this.testService.findReviewsForAttraction(id);
    }
    @Get("reviews/:id")
    getReviewById(@Param("id") id: string) {
        return this.testService.findReviewById(id);
    }
    @Get("reviews/:id/user")
    getUserForReview(@Param("id") id: string) {
        return this.testService.findUserForReview(id);
    }

    @Get("countries")
    getCountries() {
        return this.testService.findCountries();
    }
    @Get("users")
    getUsers() {
        return this.testService.findUsers();
    }
    @Get("users/:id")
    getUserById(@Param("id") id: string) {
        return this.testService.findUserById(id);
    }

    @Get("/search")
    getSearchResults(@Query("q") q: string, @Query("filter") filter: string) {
        if (!q) {
            return { label: "unexpected q" };
        }

        if (!filter) {
            //const defaultFilter = ["attractions", "hotels", "restaurants"];
            return this.testService.findSearchWithoutFilter(q, []);
        } else {
            const filterArr = filter ? filter.split(",") : null;
            const expectedFilter = ["country", "city", "attraction", "hotel", "restaurant"];
            if (
                filterArr.length > 5 ||
                (filterArr && filterArr.some(value => !expectedFilter.includes(value)))
            ) {
                // filterArr contains at least one value that is not in expectedFilter
                return { label: "unexpected filter" };
            }

            // we have to handle repetition of filters
            // to be done in frontend and backend

            return this.testService.findSearchWithoutFilter(q, filterArr);
        }
    }
}
