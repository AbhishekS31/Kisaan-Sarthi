import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import FarmOverview from '../components/FarmOverview';
import WeatherCard from '../components/WeatherCard';
import DiseaseDetection from '../components/PersonalizedCropManagement';
import VoiceAssistant from '../components/VoiceAssistant';
import GovSchemes from '../components/GovSchemes';
import AgriNews from '../components/AgriNews';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Leaf className="h-8 w-8 text-green-500" />
              </motion.div>
              <span className="ml-2 text-xl font-semibold text-gray-800">KisaanSarthi</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Farmer Siddesh</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://avatars.githubusercontent.com/u/155179612?v=4"
                alt="Farmer profile"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FarmOverview />
          <WeatherCard />
          <DiseaseDetection />
          <VoiceAssistant />
          <GovSchemes />
          <AgriNews />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
