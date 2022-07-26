import { apiCalls } from "../api/api";
import { CardActivity } from "../Components/core/CardActivity";
import { CardLocation } from "../Components/core/CardLocation";
import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { SearchEngine } from "../Components/widgets/SearchEngine";
import { Swiper } from "../Components/widgets/Swiper";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <Container>
      <Typography
        text="Enjoy the best things to do, in every destination!"
        variant="h1"
      />
      <SearchEngine />
      <div className={styles.dashboardContainer}>
        <Typography text="Locations" variant="h2" />
        <Swiper>
          {apiCalls.getLocations().map((location) => (
            <a key={location.id} href={`/locationPage/${location.id}`}>
              <CardLocation location={location} key={location.id} />
            </a>
          ))}
        </Swiper>

        <Typography text="Activities" variant="h2" />

        <Swiper>
          {apiCalls.getActivities().map((activity) => (
            <CardActivity activity={activity} key={activity.id} />
          ))}
        </Swiper>
      </div>
    </Container>
  );
};
