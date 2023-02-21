import { City } from "./City";

export interface Attraction {
    id: number;
    label: string;
    city: City;
    address: string;
    phone: string;
    suggestedDuration: string;
    openingHoursTo: string;
    openingHoursFrom: string;
    about: string;
    website: string;
    type: string;
    details: string;
    rating: string;
    reservationLink: string;
    minAge: string;
    attractionCode: string;
    email: string;
    long: number;
    lat: number;
    entryFee: number;

}