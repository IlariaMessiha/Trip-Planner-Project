import { Divider } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";
import { Typography } from "../core/Typography";
import styles from "./AttractionReviewList.module.css";
import { useTranslation } from "react-i18next";
import { AttractionReview } from "../../models/AttractionReview";

interface AttractionReviewListProps {
    reviews: AttractionReview[];
}
export const AttractionReviewList: FC<AttractionReviewListProps> = ({ reviews }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Typography
                text={t("common.reviews") + ":"}
                variant="h2"
                className={styles.reviewsTitle}
            />
            {reviews?.map(review => (
                <div key={review.id}>
                    <ReviewPost review={review} />
                    <Divider />
                </div>
            ))}
        </div>
    );
};
