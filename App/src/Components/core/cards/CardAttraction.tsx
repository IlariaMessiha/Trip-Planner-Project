import styles from "./CardAttraction.module.css";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import { AttractionDto } from "../../../types/dto/common/AttractionDto";
import { SectionItemDto } from "../../../types/dto/common/SectionItemDto";

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
            <Card className={styles.item} sx={{ maxWidth: 345 }}>
                <Link key={attraction.id} to={`/attraction/${attraction.id}`}>
                    <CardActionArea>
                        {attraction.imageUrl && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={attraction.imageUrl}
                                alt={attraction.label}
                            />
                        )}
                        <FavoriteButton>
                            <FavoriteIcon />
                        </FavoriteButton>

                        <CardContent className={styles.AttractionContent}>
                            <Typography variant="body1" className={styles.label}>
                                {attraction.label}
                            </Typography>
                            {/* {attractionCity ? (
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
                            {attraction.type && (
                                <Typography variant="body2">
                                    {attraction.type} attraction
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
