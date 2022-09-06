import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";
import { SearchPage } from "./Pages/SearchPage";

import { ActivityPage } from "./Pages/ActivityPage";

function App() {
  return (
    <Suspense fallback={null}>
      <div>
        <NavigationBar />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/location/:id" element={<LocationPage />} />
            <Route path="/activity/:id" element={<ActivityPage />} />
            <Route path="/Search" element={<SearchPage />} />
          </Routes>
        </HashRouter>
      </div>
    </Suspense>
  );
}

export default App;
