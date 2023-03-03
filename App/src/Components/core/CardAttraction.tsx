import styles from "./CardAttraction.module.css";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "../core/Typography";

import { Link } from "react-router-dom";
import { Attraction } from "../../models/Attraction";
import { City } from "../../models/City";
import { fetchData } from "../../api/FetchData";
import { AttractionReview } from "../../models/AttractionReview";

interface CardAttractionProps {
    attraction: Attraction;
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
    const [attractionCity, setAttractionCity] = useState<City | null>(null);
    const [attractionReviews, setAttractionReviews] = useState<AttractionReview[]>([]);
    useEffect(() => {
        const onMount = async () => {
            const _attractionCity = await fetchData.getCityForAttraction(attraction.id.toString());
            const _attractionReviews = await fetchData.getReviewsForAttraction(
                attraction.id.toString()
            );

            setAttractionCity(_attractionCity);
            setAttractionReviews(_attractionReviews);
        };

        onMount();
    }, []);
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ width: 320, height: 350 }}>
                <FavoriteButton>
                    <FavoriteIcon />
                </FavoriteButton>
                <Link key={attraction.id} to={`/attraction/${attraction.id}`}>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent className={styles.AttractionContent}>
                            <Typography text={attraction.label} variant="h4" />
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
                            </div>

                            <StarsRating
                                name="half-rating"
                                defaultValue={attraction.rating}
                                precision={0.5}
                                readOnly
                                sx={{}}
                            />
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
