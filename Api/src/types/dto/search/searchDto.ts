import { AttractionDto } from "../common/AttractionDto";
import { CityDto } from "../common/CityDto";
import { CountryDto } from "../common/CountryDto";
import { HotelDto } from "../common/HotelDto";
import { RestaurantDto } from "../common/RestaurantDto";

export type SearchResult = {
    type: SearchResultType;
    item: CityDto | CountryDto | AttractionDto | HotelDto | RestaurantDto;
};

export type SearchQuery = {
    label: string;
    type?: SearchResultType[];
};

export type SearchResultType = "City" | "Country" | "Attraction" | "Restaurant" | "Hotel" | "";
