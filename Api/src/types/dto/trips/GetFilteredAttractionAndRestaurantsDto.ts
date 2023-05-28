import { AttractionDto } from "../common/AttractionDto";
import { RestaurantDto } from "../common/RestaurantDto";

export interface GetFilteredAttractionAndRestaurantsDto {
    attractions: AttractionDto[];
    restaurants: RestaurantDto[];
}
