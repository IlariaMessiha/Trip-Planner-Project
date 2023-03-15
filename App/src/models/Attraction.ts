import { AttractionReview } from "./AttractionReview";
import { City } from "./City";

export interface Attraction {
    id: number;
    label: string;
    city: City;
    address: string;
    phone: string;
    suggested_duration: string;
    openning_hours_to: string;
    openning_hours_from: string;
    about: string;
    website: string;
    type: string;
    details: string;
    rating: number;
    reservationLink: string;
    minAge: string;
    attraction_code: string;
    email: string;
    long: number;
    lat: number;
    entry_fee: number;
    attraction_image: string;
    attraction_review: AttractionReview[];

}