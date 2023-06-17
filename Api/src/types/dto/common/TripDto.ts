import { TripItemDto } from "./TripItemDto";

export interface TripDto {
    // id: number;
    label: string;
    startDate: string;
    endDate: string;
    // tripCode: string;
    tripItems: TripItemDto[];
}
