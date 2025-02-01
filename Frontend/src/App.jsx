
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import PlantDisease from "./pages/PlantDisease";
import CropPlanning from "./pages/CropPlanning";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import WeatherUpdates from "./pages/WeatherUpdates";
import MarketPrices from "./pages/MarketPrices";
import VoiceSupport from "./pages/VoiceSupport.tsx";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/Signup";
import ProtectedRoute from "./Protected";
import CommunityForum from "./pages/CommunityForum.tsx"
import ChatbotIcon from './components/ChatBotIcon.jsx';
import Chatbot from './components/ChatBot.jsx';
import { useState } from "react";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleIconClick = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseForm = () => {
    setIsChatbotOpen(false);
  };
  return (
    <div className="relative min-h-screen">
      <Router>
        <Routes>
          {/* <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} /> */}
          {/* Home Route */}
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <Hero />
                <Features />
                <Stats />
                <Testimonials />
                <Footer />
              </motion.div>
            }
          />

          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          {/* Feature Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/features" element={<Features />} />
            <Route path="/features/plant-disease" element={<PlantDisease />} />
            <Route path="/features/crop-planning" element={<CropPlanning />} />
            <Route path="/features/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/features/weather-updates" element={<WeatherUpdates />} />
            <Route path="/features/market-prediction" element={<MarketPrices />} />
            <Route path="/features/fertilizer-recommendation" element={<FertilizerRecommendation />} />
            <Route path="/features/voice-chat" element={<VoiceSupport />} />
            <Route path="/features/community-forum" element={<CommunityForum />} />
          </Route>
        </Routes>
      </Router>
      <Chatbot />
    </div>
  );
}

export default App;
