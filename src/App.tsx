import React from "react";

import "./App.css";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/locationPage" element={<LocationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
