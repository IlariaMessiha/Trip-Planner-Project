import { UserDto } from "./UserDto";

export interface AttractionReviewDto {
    id: number;
    title: string;
    body: string;
    itemId: number;
    rating: number;
    user: UserDto;
}
