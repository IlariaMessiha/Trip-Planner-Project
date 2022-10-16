import { Controller, Get, Param, Post } from "@nestjs/common";
import { activities } from "src/mocks/activities";
import { locations } from "src/mocks/locations";
import { reviews } from "src/mocks/reviews";
import { users } from "src/mocks/users";
import { TestService } from "../services/test.service";
import { Location } from 'src/models/Location'

@Controller("")
export class TestController {
    constructor(private testService: TestService) { }
    @Get("activities")
    getActivities() {
        return activities;
    }
    @Get("locations")
    getLocations() {
        return locations;
    }

    @Get("locations/:id")
    getLocationById(@Param('id') id: string) {
        return locations.find(obj => {
            return obj.id === id
        });
    }
    @Get("activities/:id")
    getActivityById(@Param('id') id: string) {
        return activities.find(obj => {
            return obj.id === id;
        });
    }
    @Get('locations/:id/activities')
    public getActivitiesForLocation(@Param('id') id: string) {
        const location = locations.find(obj => {
            return obj.id === id;
        })
        return activities.filter(activity => activity.location.name === location.name);
    }

    @Get("reviews")
    getReviews() {
        return reviews;
    }
    @Get("users")
    getUsers() {
        return users;
    }
}
