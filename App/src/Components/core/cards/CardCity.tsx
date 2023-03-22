import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, IconButton, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "../Typography";
import styles from "./CardCity.module.css";
import { Link } from "react-router-dom";

import { CityDto } from "../../../types/dto/common/CityDto";

interface CardCityProps {
    city: CityDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    top: 6,
    right: 10,
    zIndex: 10,
});

export const CardCity: FC<CardCityProps> = ({ city }) => {
    const { t } = useTranslation();
    return (
        <Card className={styles.item} sx={{ width: 320, height: 350 }}>
            <FavoriteButton>
                <FavoriteIcon />
            </FavoriteButton>
            <Link key={city.id} to={`/city/${city.id}`}>
                <CardActionArea sx={{ height: "100%" }}>
                    {/* <div>
                        <CardMedia
                            component="img"
                            image={location.coverImage}
                            alt="Location Cover"
                            className={styles.image}
                            sx={{ height: 235 }}
                        />
                    </div> */}

                    <CardContent className={styles.cityContent}>
                        <Typography text={city.label} variant="h4" />
                        {/* {cityCountry ? <Typography text={cityCountry?.label} /> : <div></div>}

                        <div className={styles.cityAttractions}>
                            <Typography text={cityAttractions.length} variant="body2" />
                            <Typography text={t("common.attractions")} variant="body2" />
                        </div> */}
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};
