
import { Location } from "./Location"
import { Review } from "./Review";

export interface Activity {
    id: string
    name: string,
    address: string,
    location: Location;
    openHours: string,
    suggestedDuration: string,
    description: string,
    coverImage?: string,
    review?: Review[];
    ticketPrice: string;
    averageRating: number;
    gallery: string[];
    phoneNumber: string;
    email: string;
    website: string;

}