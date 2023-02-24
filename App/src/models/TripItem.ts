import { Attraction } from "./Attraction";
import { Restaurant } from "./Restaurant";
import { Trip } from "./Trip";

export interface TripItem {
    id: number;
    dateTime: number;
    attraction?: Attraction;
    restaurant?: Restaurant;
    trip: Trip;

}