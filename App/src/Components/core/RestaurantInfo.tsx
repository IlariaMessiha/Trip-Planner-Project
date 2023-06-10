import { Button, Paper, styled, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { RestaurantDto } from "../../types/dto/common/RestaurantDto";
import styles from "./RestaurantInfo.module.css";

interface RestaurantInfoProps {
    restaurant: RestaurantDto;
}

export const RestaurantInfo: FC<RestaurantInfoProps> = ({ restaurant }) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                padding: "20px",
                width: "30%",
            }}
        >
            <Typography variant="h6">{t("restaurant.food", { type: restaurant.food })}</Typography>
            {restaurant.rating && (
                <Box component="fieldset" borderColor="transparent">
                    <Rating name="rating-bar" value={restaurant.rating} precision={0.5} readOnly />
                </Box>
            )}
            <div className={styles.tickets}>
                <Typography variant="subtitle1" fontSize="medium">
                    {t("restaurant.averageMealPrice")}
                    {t("restaurant.averageMealPerPerson", {
                        amount: restaurant.avgMealPerPerson.toFixed(2),
                    })}
                </Typography>
            </div>

            {restaurant.address && (
                <div>
                    <Typography variant="subtitle1">
                        <LocationOnIcon fontSize="small" />
                        <span>{restaurant.address}</span>
                    </Typography>
                </div>
            )}
        </Paper>
    );
};
