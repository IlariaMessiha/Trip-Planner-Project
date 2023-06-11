import { UserDto } from "./UserDto";

export interface ReviewDto {
    id: number;
    title: string;
    body: string;
    rating: number;
    user: UserDto;
}
