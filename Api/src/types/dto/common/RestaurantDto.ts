import { AttractionTagsDto } from "../tags/AttractionTagsDto";

export interface RestaurantDto {
    id: number;
    code: string;
    label: string;
    address: string | null;
    phone: string | null;
    website: string | null;
    food: string | null;
    rating: number | null;
    email: string | null;
    mapLocation: {
        long: number;
        lat: number;
    } | null;
    imageUrl: string | null;
    avgMealPerPerson: number | null;
    tags?: AttractionTagsDto[];
}
