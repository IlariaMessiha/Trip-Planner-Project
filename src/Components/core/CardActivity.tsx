import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
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
    <Card className={styles.item} sx={{ width: 320, height: 320 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={activity.coverImage}
          alt="Activity Cover"
          className={styles.image}
          sx={{ height: 220 }}
        />
        <CardContent className={styles.ActivityContent}>
          <Typography text={activity.name} variant="h4" />
          <Typography text={activity.location.name} />
          <Typography text={activity.numberOfReviews} variant="body2" />
          <Typography text={t("common.reviews")} variant="body2" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
