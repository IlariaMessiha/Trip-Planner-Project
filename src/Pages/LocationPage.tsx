import { CardActivity } from "../Components/core/CardActivity";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { Swiper } from "../Components/widgets/Swiper";

import { Location } from "../models/Location";
import styles from "./LocationPage.module.css";
import { useParams } from "react-router";
import React, { FC } from "react";
import { ApiCalls } from "../api/api";
const apiCalls = new ApiCalls();
export const LocationPage = () => {
  const [location, setLocation] = React.useState<Location | undefined>(
    undefined
  );
  const { id } = useParams();
  React.useEffect(() => {
    if (id) {
      const _location = apiCalls.getLocation().find((obj) => {
        return obj.id === id;
      });
      setLocation(_location);
    }
  }, [id]);

  if (!location) {
    return null;
  }

  const result = apiCalls
    .getActivity()
    .filter((activity) => activity.location.name === location.name);

  return (
    <Container className={styles.container}>
      <Typography text={location.name} variant="h1" />

      <img src={location.coverImage} alt="" className={styles.image} />
      <Typography
        text={location.description}
        className={styles.locationDescription}
      />
      <Typography text="Top attraction" variant="h2" />
      <Swiper>
        {result.map((activity) => (
          <CardActivity activity={activity} key={activity.id} />
        ))}
      </Swiper>
    </Container>
  );
};
