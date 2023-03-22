import { AttractionDto } from "../common/AttractionDto";
import { CityDto } from "../common/CityDto";
import { SectionDto } from "../common/SectionDto";

export interface GetCityResponseDto {
    city: CityDto;
    attractions?: AttractionDto[];
    sections?: SectionDto[];
}
