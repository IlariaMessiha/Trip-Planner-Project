import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
// import { RestaurantsService } from "src/services/restaurants.service";
import { HotelsService } from "src/services/hotels.service";
// import { GetRestaurantResponseDto } from "src/types/dto/restaurants/GetRestaurantResponseDto";
import { GetHotelResponseDto } from "src/types/dto/hotels/GetHotelResponseDto";

@Controller("/hotels")
export class HotelsController {
    constructor(private hotelsService: HotelsService) {}

    @Get("/:id")
    getRestaurant(@Param("id", ParseIntPipe) id: number): Promise<GetHotelResponseDto> {
        return this.hotelsService.findHotel(id);
    }
}
