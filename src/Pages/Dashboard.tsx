import Carousel from "react-material-ui-carousel";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { SearchEngine } from "../Components/widgets/SearchEngine";
import { Swiper } from "../Components/widgets/Swiper";
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <Container>
      <Typography
        text="Enjoy the best things to do, in every destination!"
        variant="h1"
      />
      <SearchEngine location={locations} activity={activities} />
      <div className={styles.dashboardContainer}>
        <Typography text="Locations" variant="h2" />
        <Swiper>
          {locations.map((location) => (
            <CardLocation location={location} key={location.id} />
          ))}
        </Swiper>

        <Typography text="Activities" variant="h2" />

        <Swiper>
          {activities.map((activity) => (
            <CardActivity activity={activity} key={activity.id} />
          ))}
        </Swiper>
      </div>
    </Container>
  );
};
