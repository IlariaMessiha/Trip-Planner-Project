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
const ShareButton = styled(IconButton)({
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
            <Typography text="Open From:" variant="h4" />
            <Typography text={activity.openHours} variant="h4" />
          </div>
          <Typography text="Visit Website" variant="h4" />
          <Typography text="Call" variant="h4" />
          <Typography text="Email" variant="h4" />
          <Typography text="Write a Review" variant="h4" />
        </div>
        <ShareButton className={styles.shareButton}>
          <IosShareIcon />
        </ShareButton>
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
      </Paper>
    </Container>
  );
};
