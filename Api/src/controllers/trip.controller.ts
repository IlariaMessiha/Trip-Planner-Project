import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { find } from "lodash";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUserPayload } from "src/auth/authUser.decorator";
import { TripBuilder } from "src/classes/TripBuilder";
import { mapTripToDto } from "src/helpers/MappingDtos";
import { TripService } from "src/services/trip.service";
import { AuthUser } from "src/types/AuthUser";
import { TChatbotSubmission } from "src/types/TChatbot";
import { GetMyTripsResponseDto } from "src/types/dto/trips/GetMyTripsResponseDto";
import { UpdateTripBodyDto } from "src/types/dto/trips/UpdateTripBodyDto";

@Controller("/trip")
export class TripController {
    constructor(private tripService: TripService) {}
    @Get("/destinations")
    getDestinations() {
        return this.tripService.findDestinations();
    }
    @Get("/cities")
    getCities() {
        return this.tripService.findCityCodes();
    }
    @Get("/chatbotFlow")
    getChatbotFlow() {
        return this.tripService.findChatbotFlow();
    }

    @Post("/submissions")
    @UseGuards(AuthGuard)
    async postSubmissions(
        @Body() submissions: TChatbotSubmission[],
        @AuthUserPayload() authUser: AuthUser
    ) {
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

        const savedTrip = await this.tripService.saveTrip(trip, authUser.id);
        return mapTripToDto(savedTrip);
    }

    @Get("/get-my-trips")
    async getUserTrips(@AuthUserPayload() authUser: AuthUser): Promise<GetMyTripsResponseDto> {
        const trips = await this.tripService.findUserTrips(authUser.id);

        return {
            trips: trips.map(mapTripToDto),
        };
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    async getTrip(@Param("id", ParseIntPipe) id: number) {
        return mapTripToDto(await this.tripService.findTrip(id));
    }

    @Post("/update/:id")
    @UseGuards(AuthGuard)
    async updateTrip(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateTripBody: UpdateTripBodyDto
    ) {
        const updatedTrip = await this.tripService.updateTrip(id, updateTripBody);
        return mapTripToDto(updatedTrip);
    }
}
