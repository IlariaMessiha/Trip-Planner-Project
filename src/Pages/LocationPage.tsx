import { CardActivity } from "../Components/core/CardActivity";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { Swiper } from "../Components/widgets/Swiper";
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import styles from "./LocationPage.module.css";
const result = activities.filter(
  (activity) => activity.location.name === locations[1].name
);

export const LocationPage = () => {
  return (
    <Container className={styles.container}>
      <Typography text={locations[1].name} variant="h1" />

      <img src={locations[1].coverImage} alt="" className={styles.image} />
      <Typography
        text={locations[1].description}
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
