
import { Location } from "./Location"


export interface Activity {
    id: string
    name: string,
    address: string,
    location: Location;
    openHours: string,
    suggestedDuration: string,
    description: string,
    coverImage?: string,
    ticketPrice: string;
    averageRating: number;
    gallery: string[];
    phoneNumber: string;
    email: string;
    website: string;

}