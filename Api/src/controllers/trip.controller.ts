import { Body, Controller, Get, Post } from "@nestjs/common";
import { TripService } from "src/services/trip.service";
import { TChatbotSubmission } from "src/types/TChatbot";
import { TripDto } from "src/types/dto/common/TripDto";

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

        const { tripItemsPerDay, endDate, startDate } = this.tripService.createTripItemsPerDay(
            filtersByTarget.global
        );

        const tripItemsByDayWithBreakfast = this.tripService.addRestaurantTripItem(
            restaurantPool,
            tripItemsPerDay,
            startDate,
            "breakfast"
        );
        // const tripItemsPerDayWithAttraction = this.tripService.addAttractions(
        //     attractionPool,
        //     tripItemsPerDayWithBreakfast
        // );
        const finalTripItemsByDay = this.tripService.addRestaurantTripItem(
            restaurantPool,
            tripItemsByDayWithBreakfast,
            startDate,
            "dinner"
        );

        const trip: TripDto = {
            label: "Your recommended trip",
            startDate,
            endDate,
            // tripItems: [],
            tripItems: Object.values(finalTripItemsByDay).flat(),
        };

        return trip;
    }
}
