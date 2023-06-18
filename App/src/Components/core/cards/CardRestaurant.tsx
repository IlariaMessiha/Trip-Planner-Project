import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../api/PostData";
import { useAuthContext } from "../../../context/authContext";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";
import styles from "./CardRestaurant.module.css";

interface CardRestaurantProps {
    restaurant: RestaurantDto;
    liked: boolean;
}
interface FavoriteButtonProps {
    liked: boolean;
    onClick: () => void;
}

const FavoriteButton = styled(IconButton)(() => ({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,

    // Additional styles for the icon
    "& .MuiSvgIcon-root": {
        fill: "black",
    },
}));
const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardRestaurant: FC<CardRestaurantProps> = ({ restaurant, liked }) => {
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [likedLoc, setLikedLoc] = useState<boolean>(liked);
    const like = (restaurant: RestaurantDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.like(
                {
                    item: restaurant,
                    type: "restaurants",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(true);
        } else {
            navigate("/auth/login");
        }
    };
    const dislike = (restaurant: RestaurantDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.dislike(
                {
                    item: restaurant,
                    type: "restaurants",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(false);
        } else {
            navigate("/auth/login");
        }
    };
    useEffect(() => {
        setLikedLoc(liked);
        console.log("liked use effect");
    }, [liked]);
   
    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ width: 280 }}>
                <FavoriteButton
                    onClick={() => {
                        if (likedLoc) {
                            dislike(restaurant);
                        } else {
                            like(restaurant);
                        }
                    }}
                >
                    {likedLoc ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
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
