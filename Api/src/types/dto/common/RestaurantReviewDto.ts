import { UserDto } from "./UserDto";

export interface RestaurantReviewDto {
    id: number;
    title: string;
    body: string;
    itemId: number;
    rating: number;
    user: UserDto;
}
