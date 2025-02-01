import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Wind, Thermometer, Droplet, Umbrella, Gauge, Zap } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  { icon: <Cloud className="h-8 w-8 text-green-600" />, title: 'Automatic Location Detection', description: 'We detect your location automatically' },
  { icon: <Sun className="h-8 w-8 text-green-600" />, title: 'Get Forecast', description: 'View detailed weather predictions' },
  { icon: <Wind className="h-8 w-8 text-green-600" />, title: 'Farming Advice', description: 'Receive weather-based recommendations' },
];

const WeatherUpdates = () => {
  const API_KEY = 'a6df87d5cd2b417dbb493914250102';
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        // Fetch user's location based on IP address
        const locationResponse = await fetch(`https://api.weatherapi.com/v1/ip.json?key=${API_KEY}&q=auto:ip`);
        if (!locationResponse.ok) throw new Error('Failed to fetch location data');
        const locationData = await locationResponse.json();
        setLocation(locationData);

        // Fetch weather data for the detected location
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationData.city}`);
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationAndWeather();
  }, []);

  return (
    <FeatureLayout
      title="Stay Ahead with AI Weather Forecasts"
      description="Get real-time weather updates and AI-powered farming recommendations"
      backgroundImage="https://images.unsplash.com/photo-1504370805625-d32c54b16100?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    >
      <HowItWorks steps={steps} />

      <section className="py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Current Weather Forecast</h3>

            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 mr-2"></div>
                Fetching Weather...
              </div>
            ) : weatherData ? (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg grid grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center"><Thermometer className="h-6 w-6 text-red-500 mr-2" />Temp: {weatherData.current.temp_c}°C</div>
                <div className="flex items-center"><Droplet className="h-6 w-6 text-blue-500 mr-2" />Humidity: {weatherData.current.humidity}%</div>
                <div className="flex items-center"><Wind className="h-6 w-6 text-gray-500 mr-2" />Wind: {weatherData.current.wind_kph} kph</div>
                <div className="flex items-center"><Gauge className="h-6 w-6 text-yellow-500 mr-2" />Pressure: {weatherData.current.pressure_mb} mb</div>
                <div className="flex items-center"><Umbrella className="h-6 w-6 text-blue-400 mr-2" />Precipitation: {weatherData.current.precip_mm} mm</div>
                <div className="flex items-center"><Zap className="h-6 w-6 text-yellow-400 mr-2" />UV Index: {weatherData.current.uv}</div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Cloud className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p>Unable to fetch weather data. Please try again later.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <CallToAction title="Ready to plan your farming activities?" buttonText="Check Your Farm's Weather" onClick={() => {}} />
    </FeatureLayout>
  );
};

export default WeatherUpdates;
