import { UserDto } from "./UserDto";

export interface AttractionReviewDto {
    id: number;
    title: string;
    body: string;
    // attraction: AttractionDto;
    rating: number;
    user: UserDto;
}
