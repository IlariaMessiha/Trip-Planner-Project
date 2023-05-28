import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    styled,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import styles from "./CardRestaurant.module.css";

interface CardRestaurantProps {
    restaurant: RestaurantDto;
}
const FavoriteButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
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
            <Card className={styles.item} sx={{ width: 280 }}>
                <FavoriteButton>
                    <FavoriteBorderOutlinedIcon />
                </FavoriteButton>
                <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                    <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                        {restaurant.imageUrl && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={restaurant.imageUrl}
                                alt={restaurant.label}
                            />
                        )}

                        <CardContent className={styles.restaurantContent}>
                            <Typography variant="body1" className={styles.label}>
                                {restaurant.label}
                            </Typography>
                            {restaurant.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={restaurant.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                            {restaurant.avgMealPerPerson && (
                                <Typography variant="body2">
                                    {t("restaurant.averageMealPerPerson", {
                                        amount: restaurant.avgMealPerPerson,
                                    })}
                                </Typography>
                            )}
                            {restaurant.food && (
                                <Typography variant="body2">{restaurant.food} food</Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
