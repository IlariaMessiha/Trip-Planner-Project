import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Activity } from "../../models/Activity";
import { Typography } from "../core/Typography";
import styles from "./CardActivity.module.css";

interface CardActivityProps {
  activity: Activity;
}

export const CardActivity: FC<CardActivityProps> = ({ activity }) => {
  const { t } = useTranslation();
  return (
    <div key={activity.id} className={styles.item}>
      <img
        src={activity.coverImage}
        alt="activity-photo"
        className={styles.image}
      />
      <Typography text={activity.name} variant="h4" />
      <Typography text={activity.location.name} />
      <Typography text={activity.numberOfReviews} variant="body2" />
      <Typography text={t("common.reviews")} variant="body2" />
    </div>
  );
};
