import { FC } from "react";
import { FavoriteItem } from "../../types/dto/common/FavoriteItemDto";
import { AttractionSearchResult } from "../core/searchResult/AttractionSearchResult";
import { RestaurantSearchResult } from "../core/searchResult/RestaurantSearchResult";
import { AttractionDto } from "../../types/dto/common/AttractionDto";
import { RestaurantDto } from "../../types/dto/common/RestaurantDto";

interface FavoriteItemTypeProps {
    item: FavoriteItem;
}
export const FavoriteItemType: FC<FavoriteItemTypeProps> = ({ item }) => {
    const isSectionItemAttraction = (item: FavoriteItem): item is FavoriteItem<AttractionDto> => {
        return item.type === "attraction";
    };

    const isSectionItemRestaurant = (item: FavoriteItem): item is FavoriteItem<RestaurantDto> => {
        return item.type === "restaurant";
    };
    return (
        <div>
            {isSectionItemAttraction(item) && <AttractionSearchResult item={item.item} />}
            {isSectionItemRestaurant(item) && <RestaurantSearchResult item={item.item} />}
        </div>
    );
};
