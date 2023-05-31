import { Divider, Typography } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";

import styles from "./RestaurantReviewList.module.css";
import { useTranslation } from "react-i18next";

import { RestaurantReviewDto } from '../../types/dto/common/RestaurantReviewDto';

interface RestaurantReviewListProps {
    reviews: RestaurantReviewDto[];
}
export const RestaurantReviewList: FC<RestaurantReviewListProps> = ({ reviews }) => {
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
