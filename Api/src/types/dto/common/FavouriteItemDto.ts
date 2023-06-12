import { AttractionDto } from "../common/AttractionDto";
import { RestaurantDto } from "../common/RestaurantDto";

export interface FavoriteItem {
    item: AttractionDto | RestaurantDto;
    type: "attraction" | "restaurant";
}
