import { FC } from "react";
import { FavoriteItem } from "../../types/dto/common/FavoriteItemDto";
import { FavoriteItemType } from "./FavoriteItemType";

interface FavoriteList {
    favorites: FavoriteItem[];
}

export const FavoritesList: FC<FavoriteList> = ({ favorites }) => {
    return (
        <div>
            {favorites.map((favorite, i) => {
                return <FavoriteItemType item={favorite} key={i} />;
            })}
        </div>
    );
};
