import { AttractionDto } from "./dto/common/AttractionDto";
import { CityDto } from "./dto/common/CityDto";
import { CountryDto } from "./dto/common/CountryDto";
import { HotelDto } from "./dto/common/HotelDto";
import { RestaurantDto } from "./dto/common/RestaurantDto";

export type SearchResult = {
    type: SearchResultType;
    item: CityDto | CountryDto | AttractionDto | HotelDto | RestaurantDto;
};

export type SearchQuery = {
    label: string;
    type?: SearchResultType [];
};

export type SearchResultType = "City" | "Country" | "Attraction" | "Restaurant" | "Hotel" | "";
