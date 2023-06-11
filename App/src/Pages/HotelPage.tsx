import { Container, IconButton, styled, Typography } from "@mui/material";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./HotelPage.module.css";

import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { HotelInfo } from "../Components/core/HotelInfo";
import { SharePopup } from "../Components/widgets/SharePopup";
import { HotelDto } from "../types/dto/common/HotelDto";

import { HotelReviewList } from "../Components/widgets/HotelReviewList";
import { HotelReviewDto } from "../types/dto/common/HotelReviewDto";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});
const ReviewButton = styled(IconButton)({
    color: "black",
});

export const HotelPage = () => {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const [hotel, setHotel] = React.useState<HotelDto | null>(null);
    const [reviews, setReviews] = useState<HotelReviewDto[] | undefined>(undefined);
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getHotel(id);
                setHotel(response.hotel);
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

    if (!hotel) {
        return null;
    }
    return (
        <Container className={styles.container}>
            <Typography variant="h3">{hotel.label}</Typography>
            <div className={styles.header}>
                <div className={styles.communicate}>
                    {hotel.website && (
                        <a href={hotel.website}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.visitWebsite")}
                            </Typography>
                        </a>
                    )}
                    {hotel.phone && (
                        <a href={`tel:${hotel.phone}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.call")}
                            </Typography>
                        </a>
                    )}
                    {hotel.email && (
                        <a href={`mailto:${hotel.email}`}>
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
                <HotelInfo hotel={hotel} />
                {hotel.imageUrl && (
                    <img src={hotel.imageUrl} className={styles.image} alt={hotel.label} />
                )}
            </div>
            <div className={styles.reviewsContainer}>
                {reviews && <HotelReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
