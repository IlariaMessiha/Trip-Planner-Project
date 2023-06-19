import { Button, Container, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./RestaurantPage.module.css";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { postData } from "../api/PostData";
import { RestaurantInfo } from "../Components/core/RestaurantInfo";
import { ReviewForm } from "../Components/widgets/ReviewForm";
import { ReviewList } from "../Components/widgets/ReviewList";
import { SharePopup } from "../Components/widgets/SharePopup";
import { useAuthContext } from "../context/authContext";
import { RestaurantDto } from "../types/dto/common/RestaurantDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import { FavoriteItem } from "../types/dto/common/FavoriteItemDto";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});
const ReviewButton = styled(IconButton)({
    color: "black",
});

export const RestaurantPage = () => {
    const [sharePopupState, setSharePopupState] = React.useState(false);
    const [formState, setFormState] = useState(false);
    const { t } = useTranslation();
    const [restaurant, setRestaurant] = React.useState<RestaurantDto | null>(null);
    const [reviews, setReviews] = useState<ReviewDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<FavoriteItem[]>([]);
    const [likedLoc, setLikedLoc] = useState<boolean>(false);
    const { id } = useParams();
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();

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
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getRestaurant(id);
                setRestaurant(response.restaurant);
                setReviews(response.reviews);
            }
        };
        onMount();
    }, [id]);

    useEffect(() => {
        const getUserLikes = async (id: number, token: string) => {
            const userFavs = await fetchData.getProfileFavorites(id, token);
            setUserFavs(userFavs);
        };
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            getUserLikes(loggedInUser.id, token);
        } else {
            setUserFavs([]);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (restaurant) {
            const isLocationLiked = userFavs?.some(
                favorite => favorite.item.id === restaurant.id && favorite.type === "restaurant"
            );

            setLikedLoc(isLocationLiked);
        }
    }, [restaurant, userFavs]);

    const handleClickOpen = () => {
        setSharePopupState(true);
    };
    const handleClose = () => {
        setSharePopupState(false);
    };
    const openForm = () => {
        setFormState(true);
    };
    const closeForm = () => {
        setFormState(false);
    };

    if (!restaurant) {
        return null;
    }
    return (
        <Container className={styles.container}>
            <Typography variant="h3">{restaurant.label}</Typography>
            <div className={styles.header}>
                <div className={styles.communicate}>
                    {restaurant.website && (
                        <a href={restaurant.website}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.visitWebsite")}
                            </Typography>
                        </a>
                    )}
                    {restaurant.phone && (
                        <a href={`tel:${restaurant.phone}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.call")}
                            </Typography>
                        </a>
                    )}
                    {restaurant.email && (
                        <a href={`mailto:${restaurant.email}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("common.email")}
                            </Typography>
                        </a>
                    )}
                </div>
                <div className={styles.icons}>
                    <ShareButton className={styles.shareButton} onClick={handleClickOpen}>
                        <IosShareIcon />
                    </ShareButton>
                    <SharePopup
                        url={window.location.href}
                        open={sharePopupState}
                        onClose={handleClose}
                    />
                    <FavoriteButton
                        onClick={() => {
                            if (likedLoc) {
                                dislike(restaurant);
                            } else {
                                like(restaurant);
                            }
                        }}
                    >
                        {likedLoc ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </FavoriteButton>
                    <Tooltip title={t("common.review")}>
                        <ReviewButton>
                            <EditIcon className={styles.icon} />
                        </ReviewButton>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <RestaurantInfo restaurant={restaurant} />
                {restaurant.imageUrl && (
                    <img
                        src={restaurant.imageUrl}
                        className={styles.image}
                        alt={restaurant.label}
                    />
                )}
            </div>
            <Typography variant="h4" className={styles.reviewsTitle}>
                {t("common.reviews")}:
            </Typography>
            {!formState ? (
                <Button
                    variant="text"
                    startIcon={<EditIcon className={styles.icon} />}
                    sx={{ color: "black" }}
                    onClick={() => {
                        loggedInUser ? openForm() : navigate("/auth/login");
                    }}
                >
                    {t("common.writeReview")}
                </Button>
            ) : (
                <IconButton onClick={closeForm} sx={{ color: "red" }}>
                    <CloseIcon />
                </IconButton>
            )}
            <div className={styles.reviewsContainer}>
                {formState && <ReviewForm type="restaurantReview" itemId={restaurant.id} />}
                {reviews && <ReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
