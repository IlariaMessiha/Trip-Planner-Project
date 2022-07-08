import { Location } from "./Location"
export interface Activity {
    id: string
    name: string,
    address: string,
    location: Location,
    numberOfReviews: number,
    description: string
}