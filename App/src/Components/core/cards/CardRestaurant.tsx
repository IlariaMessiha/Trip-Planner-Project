import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    styled,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";
import { Typography } from "../Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./CardRestaurant.module.css";

interface CardRestaurantProps {
    restaurant: RestaurantDto;
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
export const CardRestaurant: FC<CardRestaurantProps> = ({ restaurant }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ maxWidth: 345 }}>
                {restaurant.imageUrl && (
                    <CardMedia
                        component="img"
                        height="194"
                        image={restaurant.imageUrl}
                        alt={restaurant.label}
                    />
                )}
                <FavoriteButton>
                    <FavoriteIcon />
                </FavoriteButton>
                <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent className={styles.restaurantContent}>
                            <Typography text={restaurant.label} variant="h4" />
                            {/* {restaurantCity ? (
                                <Typography text={restaurantCity?.label} />
                            ) : (
                                <div></div>
                            )}
                            <div className={styles.availableReviews}>
                                {restaurantReviews ? (
                                    <Typography text={restaurantReviews.length} variant="body2" />
                                ) : (
                                    <Typography text="0" variant="body2" />
                                )}

                                <Typography text={t("common.reviews")} variant="body2" />
                            </div> */}

                            {restaurant.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={restaurant.rating}
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
