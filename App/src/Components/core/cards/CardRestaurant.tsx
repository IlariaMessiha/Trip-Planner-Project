import { CardContent, Chip, Rating, styled, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../api/PostData";
import { useAuthContext } from "../../../context/authContext";
import { RestaurantDto } from "../../../types/dto/common/RestaurantDto";
import { CardBase } from "./CardBase";

interface CardRestaurantProps {
    restaurant: RestaurantDto;
    liked: boolean;
}

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardRestaurant: FC<CardRestaurantProps> = ({ restaurant, liked }) => {
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isFavorite, setIsFavorite] = useState<boolean>(liked);
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
            setIsFavorite(true);
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
            setIsFavorite(false);
        } else {
            navigate("/auth/login");
        }
    };
    useEffect(() => {
        setIsFavorite(liked);
        console.log("liked use effect");
    }, [liked]);

    return (
        <CardBase
            navigateTo={`/restaurant/${restaurant.id}`}
            imageAlt={restaurant.label}
            imageUrl={restaurant.imageUrl}
            isFavoriteEnabled={true}
            isFavorite={isFavorite}
            onFavoriteClick={() => {
                if (isFavorite) {
                    dislike(restaurant);
                } else {
                    like(restaurant);
                }
            }}
        >
            <CardContent>
                <Typography variant="body1">{restaurant.label}</Typography>
                <div>
                    {restaurant.rating && (
                        <StarsRating
                            size="small"
                            name="half-rating"
                            defaultValue={restaurant.rating}
                            precision={0.5}
                            readOnly
                        />
                    )}
                </div>
                {restaurant.avgMealPerPerson && (
                    <Typography variant="body2">
                        {t("restaurant.averageMealPerPerson", {
                            amount: restaurant.avgMealPerPerson,
                        })}
                    </Typography>
                )}
                {restaurant.food && (
                    <span style={{ paddingTop: 4 }}>
                        <Chip variant="outlined" size="small" label={restaurant.food} />
                    </span>
                )}
            </CardContent>
        </CardBase>
    );
};
