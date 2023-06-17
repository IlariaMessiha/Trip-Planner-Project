import { Body, Controller, Get, Post } from "@nestjs/common";
import { find } from "lodash";
import { TripBuilder } from "src/classes/TripBuilder";
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

        const durationFilter = find(filtersByTarget.global, "tripDuration");
        const nbDays = parseInt(durationFilter.tripDuration.equals) || 5;

        const tripBuilder = new TripBuilder(nbDays);
        tripBuilder.init();
        tripBuilder.addRestaurantTripItem(restaurantPool, "breakfast");
        tripBuilder.addAttractionTripItem(attractionPool);
        tripBuilder.addRestaurantTripItem(restaurantPool, "dinner");
        const trip = tripBuilder.build();

        return trip;
    }
}
