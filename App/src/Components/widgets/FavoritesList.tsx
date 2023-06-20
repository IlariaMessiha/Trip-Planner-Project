import { FC } from "react";
import { SectionItemDto } from "../../types/dto/common/SectionItemDto";
import { SectionItemType } from "./SectionItemType";
import { Grid } from "@mui/material";

interface FavoriteList {
    favorites: SectionItemDto[];
}

export const FavoritesList: FC<FavoriteList> = ({ favorites }) => {
    return (
        <Grid container spacing={2} marginTop={1}>
            {favorites.map((favorite, i) => (
                <Grid item xs={12} sm={6} md={3}>
                    <SectionItemType item={favorite} key={i} />
                </Grid>
            ))}
        </Grid>
    );
};
