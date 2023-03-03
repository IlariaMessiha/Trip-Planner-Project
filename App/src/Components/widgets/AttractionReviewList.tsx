import { Divider } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";
import { Typography } from "../core/Typography";
import styles from "./AttractionReviewList.module.css";
import { useTranslation } from "react-i18next";
import { Attraction } from "../../models/Attraction";
import React from "react";
import { AttractionReview } from "../../models/AttractionReview";
import { fetchData } from "../../api/FetchData";
interface AttractionReviewListProps {
    attraction: Attraction;
}
export const AttractionReviewList: FC<AttractionReviewListProps> = ({ attraction }) => {
    const { t } = useTranslation();
    const [reviews, setReviews] = React.useState<AttractionReview[] | undefined>(undefined);

    React.useEffect(() => {
        const onMount = async () => {
            const _reviews = await fetchData.getReviewsForAttraction(attraction.id.toString());
            setReviews(_reviews);
        };
        onMount();
    }, [attraction.id]);
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
