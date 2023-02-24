import { Controller, Get, Param } from "@nestjs/common";
import { mockGetActivities } from "src/mocks/activities";
import { locations } from "src/mocks/locations";
import { reviews } from "src/mocks/reviews";
import { users } from "src/mocks/users";
import { ConfigService } from "@nestjs/config";
import { TestService } from "src/services/test.service";


@Controller("")
export class TestController {
    constructor(private configService: ConfigService, private testService: TestService) {
        console.log(configService.get("IMAGES_PATH"));
    }
    @Get("/attractions/:id/city")
    getCitybyId(@Param("id") id: string) {
        return this.testService.findAttractionCity(id);
    }

    @Get('attractions')
    getAttractions() {
        return this.testService.findAttractions();

    }
    @Get('cities')
    getCities() {
        return this.testService.findCities();

    }
    @Get('countries')
    getCountries() {
        return this.testService.findCountries();
    }
    @Get('users')
    getUsers() {
        return this.testService.findUsers();
    }


    @Get("activities")
    getActivities() {
        return mockGetActivities(this.configService.get("IMAGES_PATH"));

    }
    @Get("locations")
    getLocations() {
        return locations;
    }

    @Get("locations/:id")
    getLocationById(@Param("id") id: string) {
        return locations.find(obj => {
            return obj.id === id;
        });
    }
    @Get("activities/:id")
    getActivityById(@Param("id") id: string) {
        return mockGetActivities(this.configService.get("IMAGES_PATH")).find(obj => {
            return obj.id === id;
        });
    }
    @Get("locations/:id/activities")
    public getActivitiesForLocation(@Param("id") id: string) {
        const location = locations.find(obj => {
            return obj.id === id;
        });
        return mockGetActivities(this.configService.get("IMAGES_PATH")).filter(
            activity => activity.location.name === location.name
        );
    }

    @Get("reviews")
    getReviews() {
        return reviews;
    }

}
