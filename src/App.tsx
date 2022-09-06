import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";
import { SearchPage } from "./Pages/SearchPage";

import { ActivityPage } from "./Pages/ActivityPage";

function App() {
  return (
    <Suspense fallback={null}>
      <div>
        <NavigationBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/location/:id" element={<LocationPage />} />
            <Route path="/activity/:id" element={<ActivityPage />} />
            <Route path="/Search" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
