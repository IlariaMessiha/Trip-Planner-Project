import { CityDto } from "./CityDto";

export interface RestaurantDto {
    id: number;
    restaurantCode: string;
    label: string;
    city: CityDto;
    address: string;
    phone: string;
    website: string;
    food: string;
    rating: number;
    email: string;
    mapLocation: {
        long: number;
        lat: number;
    } | null;
    avgMealPerPerson: number;
    imageUrl: string;
}
