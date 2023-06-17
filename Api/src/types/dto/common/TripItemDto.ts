import { AttractionDto } from "./AttractionDto";
import { RestaurantDto } from "./RestaurantDto";

export interface TripItemDto {
    dateTime: string;
    type: "attraction" | "restaurant";
    value: AttractionDto | RestaurantDto;
}

export type TripItemsByDayDto = Record<string, TripItemDto[]>;
