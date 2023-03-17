import { AttractionDto } from "../common/AttractionDto";

export interface GetAttractionResponseDto {
    attraction: AttractionDto;
    reviews?: any;
}
