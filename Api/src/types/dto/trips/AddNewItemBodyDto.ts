import { AttractionDto } from "../common/AttractionDto";
import { RestaurantDto } from "../common/RestaurantDto";

export interface AddNewItemBodyDto {
    tripId: number;
    destination: RestaurantDto | AttractionDto;
    type: "restaurant" | "attraction";
}
