import { Divider, Typography } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";

import styles from "./RestaurantReviewList.module.css";
import { useTranslation } from "react-i18next";

import { HotelReviewDto } from '../../types/dto/common/HotelReviewDto';

interface HotelReviewListProps {
    reviews: HotelReviewDto[];
}
export const HotelReviewList: FC<HotelReviewListProps> = ({ reviews }) => {
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
