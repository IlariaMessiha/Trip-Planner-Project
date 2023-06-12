import { Divider, Typography } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";

import { useTranslation } from "react-i18next";
import styles from "./AttractionReviewList.module.css";

import { AttractionReviewDto } from "../../types/dto/common/AttractionReviewDto";

interface AttractionReviewListProps {
    reviews: AttractionReviewDto[];
}
export const AttractionReviewList: FC<AttractionReviewListProps> = ({ reviews }) => {
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
