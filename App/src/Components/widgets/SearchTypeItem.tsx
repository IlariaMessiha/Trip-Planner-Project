import { FC } from "react";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { CityDto } from "../../types/dto/common/CityDto";
import { HotelDto } from "../../types/dto/common/HotelDto";
import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import { SearchResult } from "../../types/Search";
import { ActivitySearchResult } from "../core/searchResult/AttractionSearchResult";
import { HotelSearchResult } from "../core/searchResult/HotelSearchResult";
import { LocationSearchResult } from "../core/searchResult/CitySearchResult";

interface SearchTypeItemProps {
    item: SearchResult;
}
export const SearchTypeItem: FC<SearchTypeItemProps> = ({ item }) => {
    const isSearchItemAttraction = (item: SearchResult): item is SearchResult<AttractionDto> => {
        return item.type === "Attraction";
    };
    const isSearchItemCity = (item: SearchResult): item is SearchResult<CityDto> => {
        return item.type === "City";
    };
    const isSearchItemHotel = (item: SearchResult): item is SearchResult<HotelDto> => {
        return item.type === "Hotel";
    };

    const isSectionItemRestaurant = (item: SearchResult): item is SearchResult<RestaurantDto> => {
        return item.type === "Restaurant";
    };
    return (
        <div>
            {isSearchItemAttraction(item) && <ActivitySearchResult item={item.item} />}
            {isSearchItemHotel(item) && <HotelSearchResult item={item.item} />}

            {isSearchItemCity(item) && <LocationSearchResult item={item.item} />}
        </div>
    );
};
