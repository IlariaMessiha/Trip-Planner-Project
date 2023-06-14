import { RestaurantDto } from "../common/RestaurantDto";
import { RestaurantReviewDto } from "../common/RestaurantReviewDto";
import { CityDto } from "../common/CityDto";
import { ReviewDto } from "../reviews/ReviewDto";

export interface GetRestaurantResponseDto {
    restaurant: RestaurantDto;
    city: CityDto;
    reviews?: ReviewDto[];
}
