import { AttractionDto } from "./AttractionDto";
import { RestaurantDto } from "./RestaurantDto";

export interface FavoriteItem<V = any> {
    item: V;
    type: "attraction" | "restaurant";
}
