import { CityDto } from "./CityDto";

export interface HotelDto {
    id: number;
    hotelCode: string;
    label: string;
    address: string;
    city: CityDto;
    phone: string;
    email: string;
    website: string;
    rating: number;
    reservationLink: string;
    startingFromPrice: number;
    long: number;
    lat: number;
}
