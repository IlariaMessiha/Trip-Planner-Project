import { City } from "./City";

export interface Attraction {
    id: number;
    label: string;
    city: City;
    address: string;
    phone: string;
    suggestedDuration: string;
    openning_hours_to: string;
    openning_hours_from: string;
    about: string;
    website: string;
    type: string;
    details: string;
    rating: number;
    reservationLink: string;
    minAge: string;
    attractionCode: string;
    email: string;
    long: number;
    lat: number;
    entryFee: number;

}