import { AttractionDto } from "./AttractionDto";
import { RestaurantDto } from "./RestaurantDto";

export interface TripItemDto {
    id: number;
    dateTime: string;
    attraction?: AttractionDto;
    restaurant?: RestaurantDto;
}
