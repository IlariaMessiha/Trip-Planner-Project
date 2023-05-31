import { RestaurantDto } from "../common/RestaurantDto";
import { RestaurantReviewDto } from "../common/RestaurantReviewDto";
import { CityDto } from "../common/CityDto";

export interface GetRestaurantResponseDto {
    restaurant: RestaurantDto;
    city: CityDto;
    reviews?: RestaurantReviewDto[];
}
