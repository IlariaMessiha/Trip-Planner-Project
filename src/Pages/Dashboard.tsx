import { Typography } from "../Components/core/Typography";
import { SearchEngine } from "../Components/SearchEngine";
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={styles.pageContainer}>
      <Typography
        text="Enjoy the best things to do, in every destination!"
        variant="h1"
      />
      <SearchEngine location={locations} activity={activities} />
      <div className={styles.dashboardContainer}>
        <Typography text="Locations" variant="h2" />
        <div className={styles.locations}>
          {locations.map((value, key) => {
            return (
              <div className={styles.location}>
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
          {activities.map((value, key) => {
            return (
              <div className={styles.activity}>
                <Typography text={value.name} variant="h4" />
                <Typography text={value.city.name} />
                <Typography text={value.numberOfReviews} variant="body2" />

                <Typography text="reviews" variant="body2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
