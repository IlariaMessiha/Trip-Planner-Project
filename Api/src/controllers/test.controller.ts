import { Controller, Get, Post } from '@nestjs/common';
import { activities } from 'src/mocks/activities';
import { locations } from 'src/mocks/locations';
import { reviews } from 'src/mocks/reviews';
import { users } from 'src/mocks/users';
import { TestService } from '../services/test.service';

@Controller('')
export class TestController {
    constructor(private testService: TestService) { }
    @Get('activities')
    getActivities() {
        return activities
    }
    @Get('locations')
    getLocations() {
        return locations

    }
    @Get('reviews')
    getReviews() {
        return reviews
    }
    @Get('users')
    getUsers() {
        return users
    }
}
