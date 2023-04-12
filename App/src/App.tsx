import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";

import { SearchPage } from "./Pages/SearchPage";

import { AttractionPage } from "./Pages/AttractionPage";
import { CityPage } from "./Pages/CityPage";
import { ChatbotPage } from "./Pages/ChatbotPage";

function App() {
    return (
        <Suspense fallback={null}>
            <>
                <NavigationBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/Search" element={<SearchPage />} />
                        <Route path="/chatbot" element={<ChatbotPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/city/:id" element={<CityPage />} />
                    </Routes>
                </BrowserRouter>
            </>
        </Suspense>
    );
}

export default App;
