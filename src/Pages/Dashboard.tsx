import { apiCalls } from "../api/api";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { Swiper } from "../Components/widgets/Swiper";
import styles from "./Dashboard.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography text={t("dashboard.slogan")} variant="h1" />

      <SearchEngineAutocomplete />
      <div className={styles.dashboardContainer}>
        <Typography text={t("common.locations")} variant="h2" />
        <Swiper
          items={apiCalls.getLocations()}
          renderItem={(location) => (
            <Link key={location.id} to={`/location/${location.id}`}>
              <CardLocation location={location} key={location.id} />
            </Link>
          )}
        ></Swiper>

        <Typography text={t("common.activities")} variant="h2" />
        <Swiper
          items={apiCalls.getActivities()}
          renderItem={(activity) => (
            <Link key={activity.id} to={`/activity/${activity.id}`}>
              <CardActivity activity={activity} />
            </Link>
          )}
        ></Swiper>
      </div>
    </Container>
  );
};
