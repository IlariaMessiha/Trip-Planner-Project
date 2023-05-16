import { AttractionDto } from "./AttractionDto";
import { RestaurantDto } from "./RestaurantDto";
import { SectionItemDto } from "./SectionItemDto";

export interface TripItemDto {
    dateTime: string;
    item: SectionItemDto;
}
