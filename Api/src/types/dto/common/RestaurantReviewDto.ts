import { UserDto } from "./UserDto";

export interface RestaurantReviewDto {
    id: number;
    title: string;
    body: string;
    // restaurant: RestaurantDto;
    rating: number;
    user: UserDto;
}
