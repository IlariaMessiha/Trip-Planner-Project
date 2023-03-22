import { AttractionDto } from "./AttractionDto";
import { CityDto } from "./CityDto";
import { HotelDto } from "./HotelDto";

export interface SectionItemDto<V = any> {
    type: "attraction" | "city" | "hotel" | "restaurant";
    value: V;
}
