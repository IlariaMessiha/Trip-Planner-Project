import { TripItemDto } from "./TripItemDto";

export interface TripDto {
    id: number;
    label: string;
    arrivalDate: string;
    departureDate: string;
    tripCode: string;
    tripItems: TripItemDto[];
}
