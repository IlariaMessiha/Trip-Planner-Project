import { CountryDto } from "./CountryDto";

export interface CityDto {
    id: number;
    label: string;
    cityCode: string;
    country: CountryDto;
    mapLocation: {
        long: number;
        lat: number;
    } | null;
    imageUrl: string | null;
}
