import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { LocationPage } from "./Pages/LocationPage";
import { SearchPage } from "./Pages/SearchPage";

import { ActivityPage } from "./Pages/ActivityPage";
import { AttractionPage } from "./Pages/AttractionPage";

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
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
