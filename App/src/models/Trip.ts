import { User } from "./User";

export interface Trip {
    id: number;
    label: string;
    user: User;
    arrivalDate: string;
    departureDate: string;
    tripCode: string;

}