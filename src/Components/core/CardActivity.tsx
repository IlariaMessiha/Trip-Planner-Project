import styles from "./CardActivity.module.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Activity } from "../../models/Activity";
import { Typography } from "../core/Typography";

import { Link } from "react-router-dom";

interface CardActivityProps {
  activity: Activity;
}
const FavoriteButton = styled(IconButton)({
  position: "absolute",
  backgroundColor: "white",
  top: 6,
  right: 10,
  zIndex: 10,
});
const StarsRating = styled(Rating)({
  "&.MuiRating-root": {
    color: "blue",
  },
});
export const CardActivity: FC<CardActivityProps> = ({ activity }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <Card className={styles.item} sx={{ width: 320, height: 350 }}>
        <FavoriteButton>
          <FavoriteIcon />
        </FavoriteButton>
        <Link key={activity.id} to={`/activity/${activity.id}`}>
          <CardActionArea sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              image={activity.coverImage}
              alt="Activity Cover"
              className={styles.image}
              sx={{ height: 235 }}
            />

            <CardContent className={styles.ActivityContent}>
              <Typography text={activity.name} variant="h4" />
              <Typography text={activity.location.name} />
              <div className={styles.availableReviews}>
                {activity.review ? (
                  <Typography text={activity.review.length} variant="body2" />
                ) : (
                  <Typography text="0" variant="body2" />
                )}

                <Typography text={t("common.reviews")} variant="body2" />
              </div>
              <StarsRating
                name="half-rating"
                defaultValue={activity.averageRating}
                precision={0.5}
                readOnly
                sx={{}}
              />
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
};
