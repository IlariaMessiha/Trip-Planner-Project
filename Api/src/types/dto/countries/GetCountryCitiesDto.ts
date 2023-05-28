import { CityDto } from "../common/CityDto";
import { CountryDto } from "../common/CountryDto";

export interface GetCountryCitiesDto {
    country: CountryDto;
    cities: CityDto[];
}
