
import { Location } from "./Location"
import { Review } from "./Review";

export interface Activity {
    id: string
    name: string,
    address: string,
    location: Location;

    description: string,
    coverImage?: string;
    review?: Review[];

}