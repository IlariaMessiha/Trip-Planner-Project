import { AttractionReviewDto } from "./AttractionReviewDto";
import { HotelReviewDto } from "./HotelReviewDto";
import { RestaurantReviewDto } from "./RestaurantReviewDto";
import { UserDto } from "./UserDto";

export interface ReviewDto {
    id: number;
    title: string;
    body: string;

    rating: number;
    user: UserDto;
}
