import { Avatar, Rating, styled, Typography } from "@mui/material";
import { FC } from "react";

import { useTranslation } from "react-i18next";
import styles from "./ReviewPost.module.css";
import { ReviewDto } from "../../types/dto/reviews/ReviewDto";

interface ReviewPostProps {
    review: ReviewDto;
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
                                {review.review.user.firstName} {review.review.user.lastName}
                            </Typography>
                        </div>
                        <Typography variant="body2"> {review.review.user.email}</Typography>
                    </div>
                </div>
            </div>

            <Typography variant="body1" className={styles.title}>
                {review.review.title}
            </Typography>
            <Typography variant="body1">{review.review.body}</Typography>
            <div className={styles.rating}>
                <Typography variant="caption">{t("reviews.rating")}:</Typography>
                <StarsRating
                    name="half-rating"
                    defaultValue={review.review.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                />
            </div>
        </div>
    );
};
