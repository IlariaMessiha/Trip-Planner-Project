import { Container } from "../Components/core/layout/Container";
import { Typography } from "../Components/core/Typography";

import "../Components/widgets/Swiper.css";
import { Location } from "../models/Location";
import styles from "./LocationPage.module.css";
import { useParams } from "react-router";

import React, { useState } from "react";
import { apiCalls } from "../api/api";
import { useTranslation } from "react-i18next";
import { LocationGallery } from "../Components/widgets/LocationGallery";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";

export const LocationPage = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const { id } = useParams();
  React.useEffect(() => {
    if (id) {
      const _location = apiCalls.getLocationById(id);
      setLocation(_location);
    }
  }, [id]);

  if (!location) {
    return null;
  }

  return (
    <Container className={styles.container}>
      <Typography text={location.name} variant="h1" />

      <LocationGallery location={location} />
      <Typography
        text={t(`Locations.${location.name}.description`)}
        className={styles.locationDescription}
      />
      <LocationTopAttraction location={location} />
      <LocationTravelAdvice />
    </Container>
  );
};
