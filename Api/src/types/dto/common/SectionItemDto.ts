import { AttractionDto } from "./AttractionDto";
import { CityDto } from "./CityDto";
import { HotelDto } from "./HotelDto";

export interface SectionItemDto {
    type: "attraction" | "city" | "hotel";
    value: AttractionDto | CityDto | HotelDto;
}
