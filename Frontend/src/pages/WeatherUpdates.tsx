import React, { useState } from 'react';
import { Cloud, Sun, Wind } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Cloud className="h-8 w-8 text-green-600" />,
    title: 'Enter Location',
    description: 'Provide your farm location',
  },
  {
    icon: <Sun className="h-8 w-8 text-green-600" />,
    title: 'Get Forecast',
    description: 'View detailed weather predictions',
  },
  {
    icon: <Wind className="h-8 w-8 text-green-600" />,
    title: 'Farming Advice',
    description: 'Receive weather-based recommendations',
  },
];

const WeatherUpdates = () => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <FeatureLayout
      title="Stay Ahead with AI Weather Forecasts"
      description="Get real-time weather updates and AI-powered farming recommendations"
      backgroundImage="https://images.unsplash.com/photo-1504370805625-d32c54b16100?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    >
      <HowItWorks steps={steps} />

      <section className="py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Check Weather Forecast
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Farm Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your location"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Fetching Weather...
                  </div>
                ) : (
                  'Get Weather Forecast'
                )}
              </motion.button>
            </form>

            {/* Weather Preview Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Cloud className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p>Enter your location to see the weather forecast</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to plan your farming activities?"
        buttonText="Check Your Farm's Weather"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default WeatherUpdates;