import { Attraction } from "./Attraction";
import { User } from "./User";

export interface AttractionReview {
    id: number;
    title: string;
    body: string;
    attraction: Attraction[];
    rating: number;
    user: User;


}