import { AttractionDto } from "./AttractionDto";
import { CityDto } from "./CityDto";
import { HotelDto } from "./HotelDto";
import { RestaurantDto } from "./RestaurantDto";

export interface SectionItemDto {
    type: "attraction" | "city" | "hotel" | "restaurant";
    value: AttractionDto | CityDto | HotelDto | RestaurantDto;
}
