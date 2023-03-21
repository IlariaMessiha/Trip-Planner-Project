import { Avatar, Rating, styled } from "@mui/material";
import { FC } from "react";
import { Typography } from "./Typography";
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
                            <Typography
                                text={review.user.firstname}
                                variant="h3"
                                className={styles.authorName}
                            />
                            <Typography
                                text={review.user.lastname}
                                variant="h3"
                                className={styles.authorName}
                            />
                        </div>

                        <Typography text={review.user.email} variant="body2" />
                    </div>
                </div>
            </div>

            <Typography text={review.title} variant="h4" className={styles.header} />
            <Typography text={review.body} variant="body1" />
            <div className={styles.rating}>
                <Typography text={t("reviews.rating")} variant="body3" />
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
