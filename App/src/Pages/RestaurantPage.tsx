import { Button, Container, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./RestaurantPage.module.css";

import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { postData } from "../api/PostData";
import { RestaurantInfo } from "../Components/core/RestaurantInfo";
import { ReviewList } from "../Components/widgets/ReviewList";
import { SharePopup } from "../Components/widgets/SharePopup";
import { useAuthContext } from "../context/authContext";
import { RestaurantDto } from "../types/dto/common/RestaurantDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import { ReviewForm } from "../Components/widgets/ReviewForm";
import CloseIcon from "@mui/icons-material/Close";

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
        } else {
            navigate("/auth/login");
        }
    };
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getRestaurant(id);
                setRestaurant(response.restaurant);
                setReviews(response.reviews);
            }
        };
        onMount();
    }, [id]);
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
                                Email
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
                            like(restaurant);
                        }}
                    >
                        <FavoriteBorderIcon />
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
                    Write a Review
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
