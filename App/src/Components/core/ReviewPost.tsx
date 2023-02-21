import { Avatar } from "@mui/material";
import { FC } from "react";
import { Review } from "../../models/Review";
import { Typography } from "./Typography";
import styles from "./ReviewPost.module.css";
import { useTranslation } from "react-i18next";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";

interface ReviewPostProps {
    review: Review;
}

export const ReviewPost: FC<ReviewPostProps> = ({ review }) => {
    const { t } = useTranslation();

    const handleOnClick = () => {};
    return (
        <div className={styles.reviewContainer}>
            <div className={styles.postHeader}>
                <div className={styles.author}>
                    <Avatar />
                    <div className={styles.nameAndEmail}>
                        <Typography
                            text={review.author.firstName}
                            variant="h3"
                            className={styles.authorName}
                        />
                        <Typography text={review.author.email} variant="body2" />
                    </div>
                </div>
                <div className={styles.likes}>
                    <IconButton
                        onClick={handleOnClick}
                        sx={{
                            "&:hover": {
                                color: "black",
                            },
                        }}
                    >
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography text={review.likes} variant="likes" />
                </div>
            </div>

            <Typography text={review.header} variant="h4" className={styles.header} />
            <Typography text={review.body} variant="body1" />
            <div className={styles.date}>
                <Typography text={t("Activities.written")} variant="body3" />
                <Typography text={review.writtenAt} variant="body3" />
            </div>
        </div>
    );
};
