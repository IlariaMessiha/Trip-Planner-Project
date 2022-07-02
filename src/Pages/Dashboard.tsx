import { SearchEngine } from "../Components/SearchEngine";
import { locations } from "../mocks/locations";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SearchEngine data={locations} />
    </div>
  );
};
