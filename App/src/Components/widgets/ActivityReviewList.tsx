import { Divider } from "@mui/material";
import { FC } from "react";
import { Activity } from "../../models/Activity";
import { ReviewPost } from "../core/ReviewPost";
import { Typography } from "../core/Typography";
import styles from "./ActivityReviewList.module.css";
import { useTranslation } from "react-i18next";
interface ActivityReviewListProps {
  activity: Activity;
}
export const ActivityReviewList: FC<ActivityReviewListProps> = ({
  activity,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <Typography
        text={t("common.reviews") + ":"}
        variant="h2"
        className={styles.reviewsTitle}
      />
      {activity.review?.map((review) => (
        <div key={review.id}>
          <ReviewPost review={review} />
          <Divider />
        </div>
      ))}
    </div>
  );
};
