import { FC } from "react";
import { FavoriteItem } from "../../types/dto/common/FavouriteItemDto";
import { FavoriteItemType } from "./FavoriteItemType";

interface FavoriteList {
    favorites: FavoriteItem[];
}

export const FavoritesList: FC<FavoriteList> = ({ favorites }) => {
    return (
        <div>
            {favorites.map(favorite => {
                return <FavoriteItemType item={favorite} />;
            })}
        </div>
    );
};
