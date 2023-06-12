import { Divider, Typography } from "@mui/material";
import { FC } from "react";
import { ReviewPost } from "../core/ReviewPost";
import styles from "./ReviewList.module.css";
import { useTranslation } from "react-i18next";
import { ReviewDto } from "../../types/dto/common/ReviewDto";

interface ReviewListProps {
    reviews: ReviewDto[];
}
export const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Typography variant="h4" className={styles.reviewsTitle}>
                {t("common.reviews")}:
            </Typography>
            {reviews?.map(review => (
                <div key={review.id}>
                    <ReviewPost review={review} />
                    <Divider />
                </div>
            ))}
        </div>
    );
};
