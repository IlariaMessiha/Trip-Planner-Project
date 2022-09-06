import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { apiCalls } from "../api/api";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { Activity } from "../models/Activity";
import styles from "./ActivityPage.module.css";
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

      <img src={activity.coverImage} alt="" className={styles.image} />
      <Typography
        text={t(`Activities.${activity.name}.description`)}
        className={styles.activityDescription}
      />
    </Container>
  );
};
