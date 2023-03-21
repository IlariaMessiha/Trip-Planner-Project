import { AttractionDto } from "../common/AttractionDto";
import { CityDto } from "../common/CityDto";

export interface GetCityResponseDto {
    city: CityDto;
    attractions?: AttractionDto[];
}
