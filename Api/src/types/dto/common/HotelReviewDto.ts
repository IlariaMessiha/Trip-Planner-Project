import { UserDto } from "./UserDto";

export interface HotelReviewDto {
    id: number;
    title: string;
    body: string;
    // hotel: HotelDto;
    rating: number;
    user: UserDto;
}
