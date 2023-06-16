export interface TripDto {
    id: number;
    label: string;
    arrivalDate: string;
    departureDate: string;
    tripCode: string;
    tripItems: TripItemDto[];
}

export interface TripItemDto<V = any> {
    dateTime: string;
    type: "attraction" | "city" | "hotel" | "restaurant";
    value: V;
}
