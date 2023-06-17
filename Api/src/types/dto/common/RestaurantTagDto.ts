import { TagDto } from "./TagDto";

export interface RestaurantTagDto {
    restaurantId: number;
    id: number;
    tag: TagDto;
}
