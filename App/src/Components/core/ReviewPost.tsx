import { Avatar } from "@mui/material";
import { FC } from "react";
import { Typography } from "./Typography";
import styles from "./ReviewPost.module.css";
import { useTranslation } from "react-i18next";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import { AttractionReview } from "../../models/AttractionReview";
import React from "react";
import { fetchData } from "../../api/FetchData";
import { User } from "../../models/User";

interface ReviewPostProps {
    review: AttractionReview;
}

export const ReviewPost: FC<ReviewPostProps> = ({ review }) => {
    const { t } = useTranslation();
    const [user, setUser] = React.useState<User | undefined>(undefined);

    React.useEffect(() => {
        const onMount = async () => {
            const _user = await fetchData.getUserForReview(review.id.toString());
            setUser(_user);
        };
        onMount();
    }, [review.id]);
    if (!user) {
        return null;
    }

    return (
        <div className={styles.reviewContainer}>
            <div className={styles.postHeader}>
                <div className={styles.author}>
                    <Avatar />
                    <div className={styles.nameAndEmail}>
                        <div className={styles.fullName}>
                            <Typography
                                text={user.firstname}
                                variant="h3"
                                className={styles.authorName}
                            />
                            <Typography
                                text={user.lastname}
                                variant="h3"
                                className={styles.authorName}
                            />
                        </div>

                        <Typography text={user.email} variant="body2" />
                    </div>
                </div>
            </div>

            <Typography text={review.title} variant="h4" className={styles.header} />
            <Typography text={review.body} variant="body1" />
            <div className={styles.date}>
                <Typography text={t("Activities.written")} variant="body3" />
                <Typography text={review.rating} variant="body3" />
            </div>
        </div>
    );
};
