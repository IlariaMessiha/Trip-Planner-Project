import { FC } from "react";
import styles from "./RestaurantSearchResult.module.css";
import { useTranslation } from "react-i18next";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link } from "react-router-dom";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";

interface RestaurantSearchResultProps {
    item: RestaurantDto;
}
export const RestaurantSearchResult: FC<RestaurantSearchResultProps> = ({ item }) => {
    const { t } = useTranslation();

    if (!item) {
        return null;
    }
    return (
        <>
            <Paper className={styles.searchResultElement}>
                <Link to={`/restaurant/${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.imageUrl && <img src={item.imageUrl} alt="Cover" />}
                </Link>

                <div className={styles.rightSide}>
                    <Link to={`/restaurant/${item.id}`} target="_blank" rel="noopener noreferrer">
                        <Typography variant="h4" className={styles.title}>
                            {item.label}
                        </Typography>
                        {/* {item.item.label} */}
                    </Link>

                    <div className={styles.resultType}>
                        <RestaurantIcon />

                        <Typography variant="body1">{t(String(`common.restaurant`))}</Typography>
                    </div>
                    <Typography variant="body1">{item.address || ""} </Typography>
                </div>
            </Paper>
        </>
    );
};
