export interface TripDto {
    label: string;
    endDate: string;
    startDate: string;
    tripItems: TripItemDto[];
}

export interface TripItemDto<V = any> {
    dateTime: string;
    type: "attraction" | "city" | "hotel" | "restaurant";
    value: V;
}
