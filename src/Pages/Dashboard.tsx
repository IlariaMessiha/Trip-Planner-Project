import { apiCalls } from "../api/api";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { Swiper } from "../Components/widgets/Swiper";
import styles from "./Dashboard.module.css";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography text={t("dashboard.slogan")} variant="h1" />

      <SearchEngineAutocomplete />
      <div className={styles.dashboardContainer}>
        <Typography text={t("dashboard.locations")} variant="h2" />
        <Swiper>
          {apiCalls.getLocations().map((location) => (
            <a key={location.id} href={`/location/${location.id}`}>
              <CardLocation location={location} key={location.id} />
            </a>
          ))}
        </Swiper>

        <Typography text={t("dashboard.activities")} variant="h2" />

        <Swiper>
          {apiCalls.getActivities().map((activity) => (
            <a key={activity.id} href={`/activity/${activity.id}`}>
              <CardActivity activity={activity} />
            </a>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};
