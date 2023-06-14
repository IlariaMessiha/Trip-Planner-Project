import { AttractionDto } from "../common/AttractionDto";
import { CityDto } from "../common/CityDto";
import { ReviewDto } from "../reviews/ReviewDto";

export interface GetAttractionResponseDto {
    attraction: AttractionDto;
    city: CityDto;
    reviews?: ReviewDto[];
}
