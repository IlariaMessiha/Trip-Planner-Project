import { Container } from "../Components/core/Container";
import { Typography } from "../Components/core/Typography";
import { SearchEngine } from "../Components/SearchEngine";
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
        <div className={styles.locations}>
          {locations.map((value) => {
            return (
              <div key={value.id} className={styles.location}>
                <Typography text={value.name} variant="h4" />
                <Typography text={value.country} />
                <Typography text={value.activities} variant="body2" />
                <Typography text="activities" variant="body2" />
              </div>
            );
          })}
        </div>
        <Typography text="Activities" variant="h2" />
        <div className={styles.activities}>
          {activities.map((value) => {
            return (
              <div key={value.id} className={styles.activity}>
                <Typography text={value.name} variant="h4" />
                <Typography text={value.city.name} />
                <Typography text={value.numberOfReviews} variant="body2" />

                <Typography text="reviews" variant="body2" />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
