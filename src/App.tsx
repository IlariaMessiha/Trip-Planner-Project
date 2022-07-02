import React from "react";

import "./App.css";
import { NavigationBar } from "./Components/NavigationBar";

import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <Dashboard />
    </div>
  );
}

export default App;
