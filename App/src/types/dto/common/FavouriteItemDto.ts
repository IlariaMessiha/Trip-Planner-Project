import { AttractionDto } from "../common/AttractionDto";
import { RestaurantDto } from "../common/RestaurantDto";

export interface FavoriteItem<V = any> {
    item: V;
    type: "attraction" | "restaurant";
}
