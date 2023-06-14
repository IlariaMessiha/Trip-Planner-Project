import { Divider } from "@mui/material";
import { FC } from "react";
import { ReviewDto } from "../../types/dto/reviews/ReviewDto";
import { ReviewPost } from "../core/ReviewPost";
import styles from "./ReviewList.module.css";

interface ReviewListProps {
    reviews: ReviewDto[];
}
export const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className={styles.container}>
            {reviews?.map(review => (
                <div key={review.review.id}>
                    <ReviewPost review={review} />
                    <Divider />
                </div>
            ))}
        </div>
    );
};
