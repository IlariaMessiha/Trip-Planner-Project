import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchPage } from "./Pages/SearchPage";
import React, { useState } from "react";
import { AttractionPage } from "./Pages/AttractionPage";
import { CityPage } from "./Pages/CityPage";
import { SignIn } from "./Pages/loginPage";
import { Profile } from "./Pages/profilePage";
import { SignUp } from "./Pages/registerPage";
import AuthService from "./services/auth.service";

function App() {
    const [currentUser, setCurrentUser] = useState<any>(AuthService.getCurrentUser());

    const handleLogout = () => {
        AuthService.logout();
        setCurrentUser(AuthService.getCurrentUser());
    };

    const handlelogin = () => {
        setCurrentUser(AuthService.getCurrentUser());
    };

    console.log("current user : ", currentUser);

    return (
        <Suspense fallback={null}>
            <div>
                <ToastContainer />
                <BrowserRouter>
                    <NavigationBar currentUser={currentUser} handleLogout={handleLogout} />
                    <Routes>
                        <Route path="/Search" element={<SearchPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/login" element={<SignIn handlelogin={handlelogin} />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="*" element={<h1>Error</h1>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
