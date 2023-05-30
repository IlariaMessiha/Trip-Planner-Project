import { Avatar, Rating, styled, Typography } from "@mui/material";
import { FC } from "react";

import styles from "./ReviewPost.module.css";
import { useTranslation } from "react-i18next";

import React from "react";
import { fetchData } from "../../api/FetchData";

import { AttractionReviewDto } from "../../types/dto/common/AttractionReviewDto";
import { UserDto } from "../../types/dto/common/UserDto";

interface ReviewPostProps {
    review: AttractionReviewDto;
}
const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});

export const ReviewPost: FC<ReviewPostProps> = ({ review }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.reviewContainer}>
            <div className={styles.postHeader}>
                <div className={styles.author}>
                    <Avatar />
                    <div className={styles.nameAndEmail}>
                        <div className={styles.fullName}>
                            <Typography variant="body1" className={styles.authorName}>
                                {review.user.firstName} {review.user.lastName}
                            </Typography>
                        </div>
                        <Typography variant="body2"> {review.user.email}</Typography>
                    </div>
                </div>
            </div>

            <Typography variant="body1" className={styles.title}>
                {review.title}
            </Typography>
            <Typography variant="body1">{review.body}</Typography>
            <div className={styles.rating}>
                <Typography variant="caption">{t("reviews.rating")}:</Typography>
                <StarsRating
                    name="half-rating"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                />
            </div>
        </div>
    );
};
