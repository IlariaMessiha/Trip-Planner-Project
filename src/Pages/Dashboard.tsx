import { SearchEngine } from "../Components/SearchEngine";
import { locations } from "../mocks/locations";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div>
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
      </div>
    </div>
  );
};
