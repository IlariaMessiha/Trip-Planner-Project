import { Country } from "./Country";

export interface City {
    id: number;
    label: string;
    country: Country;
    cityCode: string;
    long: number;
    lat: number;

}