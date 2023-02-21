import { City } from "./City";

export interface Restaurant {
    id: number;
    restaurantCode: string;
    label: string;
    city: City;
    address: string;
    phone: string;
    website: string;
    foos: string;
    rating: number;
    email: string;
    long: number;
    lat: number;
    avgMealPerPerson: number;
}