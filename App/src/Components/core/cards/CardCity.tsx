import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, IconButton, styled, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styles from "./CardCity.module.css";
import { Link } from "react-router-dom";

import { CityDto } from "../../../types/dto/common/CityDto";

interface CardCityProps {
    city: CityDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,
});

export const CardCity: FC<CardCityProps> = ({ city }) => {
    const { t } = useTranslation();
    return (
        <Card className={styles.item} sx={{ maxWidth: 280 }}>
            <Link key={city.id} to={`/city/${city.id}`}>
                <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                    {city.imageUrl && (
                        <CardMedia
                            component="img"
                            height="194"
                            image={city.imageUrl}
                            alt={city.label}
                            className={styles.image}
                        />
                    )}
                    <FavoriteButton>
                        <FavoriteBorderOutlinedIcon />
                    </FavoriteButton>

                    <CardContent className={styles.cityContent}>
                        <Typography variant="body1" className={styles.label}>
                            {city.label}
                        </Typography>
                        {city.country && (
                            <Typography variant="body2">{city.country.label}</Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};
