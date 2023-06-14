import { AttractionDto } from "../common/AttractionDto";
import { RestaurantDto } from "../common/RestaurantDto";

export interface LikedItem {
    item: AttractionDto | RestaurantDto;
    type: "attraction" | "restaurants";
    userId: number;
}
