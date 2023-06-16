import { Body, Controller, Get, Post } from "@nestjs/common";
import { TripService } from "src/services/trip.service";
import { TChatbotSubmission } from "src/types/TChatbot";

@Controller("/trip")
export class TripController {
    constructor(private tripService: TripService) {}
    @Get("/destinations")
    getDestinations() {
        return this.tripService.findDestinations();
    }
    @Get("/chatbotFlow")
    getChatbotFlow() {
        return this.tripService.findChatbotFlow();
    }

    @Post("/submissions")
    async postSubmissions(@Body() submissions: TChatbotSubmission[]) {
        const filtersByTarget = this.tripService.deduceFiltersByTarget(submissions);
        const attractionPool = await this.tripService.findAttractionPool(
            filtersByTarget.attractions
        );
        const restaurantPool = await this.tripService.findRestaurantPool(
            filtersByTarget.restaurants
        );

        const tripItemsPerDay = this.tripService.createTripItemPerDay(filtersByTarget.global);
        this.tripService.addBreakfast(restaurantPool, tripItemsPerDay);
        return this.tripService.addAttractions(attractionPool, tripItemsPerDay);
    }
}
