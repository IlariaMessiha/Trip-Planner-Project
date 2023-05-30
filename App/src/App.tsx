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
import { RegisterPage } from "./Pages/RegisterPage";
import { AuthProvider } from "./context/AuthProvider";
import { LoginPage } from "./Pages/LoginPage";

function App() {
    return (
        <Suspense fallback={null}>
            <AuthProvider>
                <ToastContainer />
                <BrowserRouter>
                    <NavigationBar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/chatbot" element={<ChatbotPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/trip" element={<TripPage />} />

                        <Route path={"/auth"}>
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Route>
                        <Route path="*" element={<h1>Error</h1>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </Suspense>
    );
}

export default App;
