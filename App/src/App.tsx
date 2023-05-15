import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";

import { SearchPage } from "./Pages/SearchPage";

import { AttractionPage } from "./Pages/AttractionPage";
import { CityPage } from "./Pages/CityPage";
import { Login } from "./Pages/loginPage";
import { Profile } from "./Pages/profilePage";
import { Register } from "./Pages/registerPage";


function App() {
    return (
        <Suspense fallback={null}>
            <div>
                <NavigationBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/Search" element={<SearchPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
