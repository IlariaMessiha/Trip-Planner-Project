import { Location } from "./Location"
export interface Activity {
    id: string
    name: string,
    address: string,
    city: Location,
    country: string,
    numberOfReviews: number,
    description: string
}