import { HotelDto } from "../common/HotelDto";
import { HotelReviewDto } from "../common/HotelReviewDto";
import { CityDto } from "../common/CityDto";

export interface GetHotelResponseDto {
    hotel: HotelDto;
    city: CityDto;
    reviews?: HotelReviewDto[];
}
