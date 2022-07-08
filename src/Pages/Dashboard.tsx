import { SearchEngine } from "../Components/SearchEngine";
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.slogan}>
        Enjoy the best things to do, in every destination!
      </h1>
      <SearchEngine location={locations} activity={activities} />
      <div className={styles.dashboardContainer}>
        <h2 className={styles.title}>Locations</h2>
        <div className={styles.locations}>
          {locations.map((value, key) => {
            return (
              <div className={styles.location}>
                <div className={styles.locationName}>{value.name}</div>
                <div className={styles.locationCountry}>{value.country}</div>
                <div className={styles.locationActivities}>
                  {value.activities} activities
                </div>
              </div>
            );
          })}
        </div>
        <h2 className={styles.title}>Acivities</h2>
        <div className={styles.activities}>
          {activities.map((value, key) => {
            return (
              <div className={styles.activity}>
                <div className={styles.activityName}>{value.name}</div>
                <div className={styles.activityCity}>{value.city.name}</div>
                <div className={styles.activityReviews}>
                  {value.numberOfReviews} reviews
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
