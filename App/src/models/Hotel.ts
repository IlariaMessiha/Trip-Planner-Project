import { City } from "./City";

export interface Hotel {
    id: number;
    hotelCode: string;
    label: string;
    address: string;
    city: City;
    phone: string;
    email: string;
    website: string;
    rating: number;
    reservationLink: string;
    startingFromPrice: number;
    long: number;
    lat: number;

}