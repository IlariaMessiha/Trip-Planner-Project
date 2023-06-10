import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { RestaurantsService } from "src/services/restaurants.service";
import { GetRestaurantResponseDto } from "src/types/dto/restaurants/GetRestaurantResponseDto";

@Controller("/restaurants")
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) {}

    @Get("/:id")
    getRestaurant(@Param("id", ParseIntPipe) id: number): Promise<GetRestaurantResponseDto> {
        return this.restaurantsService.findRestaurant(id);
    }
}
