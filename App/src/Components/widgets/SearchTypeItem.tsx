import { FC } from "react";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { CityDto } from "../../types/dto/common/CityDto";
import { HotelDto } from "../../types/dto/common/HotelDto";
import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import { SearchResult } from "../../types/Search";

import { HotelSearchResult } from "../core/searchResult/HotelSearchResult";
import { CitySearchResult } from "../core/searchResult/CitySearchResult";
import { RestaurantSearchResult } from "../core/searchResult/RestaurantSearchResult";
import { AttractionSearchResult } from "../core/searchResult/AttractionSearchResult";

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

    const isSearchItemRestaurant = (item: SearchResult): item is SearchResult<RestaurantDto> => {
        return item.type === "Restaurant";
    };
    return (
        <div>
            {isSearchItemAttraction(item) && <AttractionSearchResult item={item.item} />}
            {isSearchItemHotel(item) && <HotelSearchResult item={item.item} />}
            {isSearchItemRestaurant(item) && <RestaurantSearchResult item={item.item} />}

            {isSearchItemCity(item) && <CitySearchResult item={item.item} />}
        </div>
    );
};
