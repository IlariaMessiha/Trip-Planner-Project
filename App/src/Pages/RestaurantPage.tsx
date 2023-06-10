import { Container, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import styles from "./RestaurantPage.module.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { RestaurantInfo } from "../Components/core/RestaurantInfo";
import { SharePopup } from "../Components/widgets/SharePopup";
import Tooltip from "@mui/material/Tooltip";
import { RestaurantDto } from "../types/dto/common/RestaurantDto";
import { RestaurantReviewDto } from "../types/dto/common/RestaurantReviewDto";
import { RestaurantReviewList } from "../Components/widgets/RestaurantReviewList";

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
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [restaurant, setRestaurant] = React.useState<RestaurantDto | null>(null);
    const [reviews, setReviews] = useState<RestaurantReviewDto[] | undefined>(undefined);
    const { id } = useParams();
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
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                    <SharePopup url={window.location.href} open={open} onClose={handleClose} />
                    <FavoriteButton className={styles.shareButton}>
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
            <div className={styles.reviewsContainer}>
                {reviews && <RestaurantReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
