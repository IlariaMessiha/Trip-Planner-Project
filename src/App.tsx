import React from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";
import { SearchPage } from "./Pages/SearchPage";

function App() {
  return (
    <div>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/locationPage" element={<LocationPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
