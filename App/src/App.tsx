import { Suspense } from "react";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";

import { SearchPage } from "./Pages/SearchPage";

import { AttractionPage } from "./Pages/AttractionPage";
import { CityPage } from "./Pages/CityPage";
import { ChatbotButton } from "./Components/widgets/ChatbotButton";
import { ChatbotPage } from "./Pages/ChatbotPage";

function App() {
    return (
        <Suspense fallback={null}>
            <div>
                <NavigationBar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/Search" element={<SearchPage />} />
                        <Route path="/attraction/:id" element={<AttractionPage />} />
                        <Route path="/city/:id" element={<CityPage />} />
                        <Route path="/chatbot" element={<ChatbotPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
