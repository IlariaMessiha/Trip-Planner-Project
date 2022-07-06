import { SearchEngine } from "../Components/SearchEngine";
import { activities } from "../mocks/activities";
import { locations } from "../mocks/locations";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="page-container">
      <h1 className="slogan">
        Enjoy the best things to do, in every destination!
      </h1>
      <SearchEngine data={locations} />
      <div className="dashboard-container">
        <h2>Locations</h2>
        <div className="locations">
          {locations.map((value, key) => {
            return (
              <div className="location">
                <div className="location-name">{value.name}</div>
                <div className="location-country">{value.country}</div>
                <div className="location-activities">{value.activities}</div>
              </div>
            );
          })}
        </div>
        <h2>Acivities</h2>
        <div className="activities">
          {activities.map((value, key) => {
            return (
              <div className="activity">
                <div className="activity-name">{value.name}</div>
                <div className="activity-city">{value.city}</div>
                <div className="activity-reviews">
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
