import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavigationBar } from "./Components/NavigationBar";
import { AttractionPage } from "./Pages/AttractionPage";
import { ChatbotPage } from "./Pages/ChatbotPage";
import { CityPage } from "./Pages/CityPage";
import { Dashboard } from "./Pages/Dashboard";
import { SearchPage } from "./Pages/SearchPage";
import { TripPage } from "./Pages/TripPage";
import { Profile } from "./Pages/profilePage";
import { SignUp } from "./Pages/registerPage";
import { AuthProvider } from "./context/AuthProvider";
import { LoginPage } from "./Pages/LoginPage";

function App() {
    return (
        <Suspense fallback={null}>
            <AuthProvider>
                <ToastContainer />
                <NavigationBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/chatbot" element={<ChatbotPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="*" element={<h1>Error</h1>} />
                        <Route path="/trip" element={<TripPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </Suspense>
    );
}

export default App;
