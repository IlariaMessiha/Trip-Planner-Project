import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Button, Container, IconButton, styled, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { postData } from "../api/PostData";
import { AttractionInfo } from "../Components/core/AttractionInfo";
import { ReviewForm } from "../Components/widgets/ReviewForm";
import { ReviewList } from "../Components/widgets/ReviewList";
import { SharePopup } from "../Components/widgets/SharePopup";
import { useAuthContext } from "../context/authContext";
import { AttractionDto } from "../types/dto/common/AttractionDto";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import styles from "./AttractionPage.module.css";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});

export const AttractionPage = () => {
    const [sharePopupState, setSharePopupState] = useState(false);
    const [formState, setFormState] = useState(false);
    const { t } = useTranslation();
    const [attraction, setAttraction] = React.useState<AttractionDto | null>(null);
    const [reviews, setReviews] = useState<ReviewDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<SectionItemDto[]>([]);
    const [likedLoc, setLikedLoc] = useState<boolean>(false);
    const { id } = useParams();
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getAttraction(id);
                setAttraction(response.attraction);
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
        console.log(loggedInUser, token);
        if (loggedInUser && token) {
            getUserLikes(loggedInUser.id, token);
        } else {
            setUserFavs([]);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (attraction) {
            const isLocationLiked = userFavs?.some(
                favorite => favorite.value.id === attraction.id && favorite.type === "attraction"
            );
            setLikedLoc(isLocationLiked);
        }
    }, [attraction, userFavs]);

    const handleClickOpen = () => {
        setSharePopupState(true);
    };
    const handleClose = () => {
        setSharePopupState(false);
    };

    if (!attraction) {
        return null;
    }
    const like = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.like(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(true);
        } else {
            navigate("/auth/login");
        }
    };

    const dislike = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.dislike(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(false);
        } else {
            navigate("/auth/login");
        }
    };

    const openForm = () => {
        setFormState(true);
    };
    const closeForm = () => {
        setFormState(false);
    };

    return (
        <Container className={styles.container}>
            <Typography variant="h3">{attraction.label}</Typography>
            <div className={styles.header}>
                <div className={styles.communicate}>
                    {attraction.openingHours && dayjs(attraction.openingHours?.from).isValid() && (
                        <div className={styles.openHours}>
                            <Typography variant="h6">
                                {t("attractions.openHours", {
                                    from: dayjs(attraction.openingHours?.from).format("HH:mm"),
                                    to: dayjs(attraction.openingHours?.to).format("HH:mm"),
                                })}
                            </Typography>
                        </div>
                    )}
                    {attraction.website && (
                        <a href={attraction.website}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.visitWebsite")}
                            </Typography>
                        </a>
                    )}
                    {attraction.phone && (
                        <a href={`tel:${attraction.phone}`}>
                            <Typography variant="h6" className={styles.headerButtons}>
                                {t("attractions.call")}
                            </Typography>
                        </a>
                    )}
                    {attraction.email && (
                        <a href={`mailto:${attraction.email}`}>
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
                                dislike(attraction);
                            } else {
                                like(attraction);
                            }
                        }}
                    >
                        {likedLoc ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </FavoriteButton>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <AttractionInfo attraction={attraction} />
                {attraction.imageUrl && (
                    <img
                        src={attraction.imageUrl}
                        className={styles.image}
                        alt={attraction.label}
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
                {formState && <ReviewForm type="attractionReview" itemId={attraction.id} />}
                {reviews && <ReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
