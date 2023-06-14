import { CityDto } from "../common/CityDto";
import { RestaurantDto } from "../common/RestaurantDto";
import { ReviewDto } from "../reviews/ReviewDto";

export interface GetRestaurantResponseDto {
    restaurant: RestaurantDto;
    city: CityDto;
    reviews?: ReviewDto[];
}
