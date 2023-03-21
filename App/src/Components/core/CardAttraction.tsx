import styles from "./CardAttraction.module.css";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "../core/Typography";

import { Link } from "react-router-dom";

import { AttractionDto } from "../../types/dto/common/AttractionDto";

interface CardAttractionProps {
    attraction: AttractionDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    top: 6,
    right: 10,
    zIndex: 10,
});
const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardAttraction: FC<CardAttractionProps> = ({ attraction }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ width: 320, height: 350 }}>
                {attraction.imageUrl && (
                    <CardMedia
                        component="img"
                        height="100"
                        image={attraction.imageUrl}
                        alt={attraction.label}
                    />
                )}
                <FavoriteButton>
                    <FavoriteIcon />
                </FavoriteButton>
                <Link key={attraction.id} to={`/attraction/${attraction.id}`}>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent className={styles.AttractionContent}>
                            {/* <Typography text={attraction.label} variant="h4" />
                            {attractionCity ? (
                                <Typography text={attractionCity?.label} />
                            ) : (
                                <div></div>
                            )}
                            <div className={styles.availableReviews}>
                                {attractionReviews ? (
                                    <Typography text={attractionReviews.length} variant="body2" />
                                ) : (
                                    <Typography text="0" variant="body2" />
                                )}

                                <Typography text={t("common.reviews")} variant="body2" />
                            </div> */}

                            {attraction.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={attraction.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
