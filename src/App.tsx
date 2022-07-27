import React from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";
import { SearchPage } from "./Pages/SearchPage";
import { locations } from "./mocks/locations";
import { activities } from "./mocks/activities";
import { ActivityPage } from "./Pages/ActivityPage";

function App() {
  return (
    <div>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/location/:id" element={<LocationPage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
