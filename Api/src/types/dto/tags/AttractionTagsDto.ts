import { AttractionDto } from "../common/AttractionDto";
import { AttractionTagDto } from "../common/AttractionTagDto";

export interface AttractionTagsDto {
    attraction: AttractionDto;
    tags: AttractionTagDto[];
}
