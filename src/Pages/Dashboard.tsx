import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { apiCalls } from "../api/api";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/layout/Container";
import { Section } from "../Components/core/layout/Section";
import { Typography } from "../Components/core/Typography";
import { SearchEngineAutocomplete } from "../Components/widgets/SearchEngineAutocomplete";
import { Swiper } from "../Components/widgets/Swiper";

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography text={t("dashboard.slogan")} variant="h1" />

      <SearchEngineAutocomplete />
      <Section title={t("common.locations")}>
        <Swiper
          items={apiCalls.getLocations()}
          renderItem={(location) => (
            <Link key={location.id} to={`/location/${location.id}`}>
              <CardLocation location={location} key={location.id} />
            </Link>
          )}
        />
      </Section>

      <Section title={t("common.activities")}>
        <Swiper
          items={apiCalls.getActivities()}
          renderItem={(activity) => (
            <Link key={activity.id} to={`/activity/${activity.id}`}>
              <CardActivity activity={activity} />
            </Link>
          )}
        />
      </Section>
    </Container>
  );
};
