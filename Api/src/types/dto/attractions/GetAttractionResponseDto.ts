import { AttractionDto } from "../common/AttractionDto";
import { AttractionReviewDto } from "../common/AttractionReviewDto";
import { CityDto } from "../common/CityDto";

export interface GetAttractionResponseDto {
    attraction: AttractionDto;
    city: CityDto;
    reviews?: AttractionReviewDto[];
}
