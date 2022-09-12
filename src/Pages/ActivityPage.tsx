import { Paper, styled } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { apiCalls } from "../api/api";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { Activity } from "../models/Activity";
import styles from "./ActivityPage.module.css";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ShareButton = styled(IconButton)({
  color: "black",
});
const FavoriteButton = styled(IconButton)({
  color: "black",
});
export const ActivityPage = () => {
  const { t } = useTranslation();
  const [activity, setActivity] = React.useState<Activity | undefined>(
    undefined
  );
  const { id } = useParams();
  React.useEffect(() => {
    if (id) {
      const _activity = apiCalls.getActivityById(id);
      setActivity(_activity);
    }
  }, [id]);

  if (!activity) {
    return null;
  }
  return (
    <Container>
      <Typography text={activity.name} variant="h1" />
      <div className={styles.header}>
        <div className={styles.communicate}>
          <div className={styles.openHours}>
            <Typography text={t("Activities.open hours") + ":"} variant="h4" />
            <Typography text={activity.openHours} variant="h4" />
          </div>
          <Typography
            text={t("Activities.visit website")}
            variant="h4"
            className={styles.headerButtons}
          />
          <Typography
            text={t("Activities.call")}
            variant="h4"
            className={styles.headerButtons}
          />
          <Typography
            text="Email"
            variant="h4"
            className={styles.headerButtons}
          />
          <Typography
            text={t("common.review")}
            variant="h4"
            className={styles.headerButtons}
          />
        </div>
        <div className={styles.icons}>
          <ShareButton className={styles.shareButton}>
            <IosShareIcon />
          </ShareButton>
          <FavoriteButton className={styles.shareButton}>
            <FavoriteBorderIcon />
          </FavoriteButton>
        </div>
      </div>

      <img src={activity.coverImage} alt="Cover " className={styles.image} />
      <Paper sx={{ padding: "20px", width: "30%", float: "left" }}>
        <Typography text={t("Activities.about")} variant="h2" />
        <Typography
          text={t(`Activities.${activity.name}.description`)}
          className={styles.activityDescription}
        />
        <Typography text={t("Activities.suggested duration")} variant="h4" />
        <div className={styles.suggestedDuration}>
          <Typography text={activity.suggestedDuration} />
          <Typography text={t("Activities.hours")} />
        </div>
        <div className={styles.tickets}>
          <Typography text={t("Activities.ticket price")} variant="h4" />
          <Typography text={activity.ticketPrice} />
        </div>
      </Paper>
    </Container>
  );
};
