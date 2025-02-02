import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({
    temp_c: 0,
    humidity: 0,
    wind_kph: 0,
    cloud: 0,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: 'a6df87d5cd2b417dbb493914250102', // Replace with your actual API key
            q: 'Surat', // Replace with desired location
            days: 5,
          },
        });

        const forecastData = response.data.forecast.forecastday.map((day: any) => ({
          day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: day.day.avgtemp_c,
          humidity: day.day.avghumidity,
        }));

        setWeatherData(forecastData);
        setCurrentWeather({
          temp_c: response.data.current.temp_c,
          humidity: response.data.current.humidity,
          wind_kph: response.data.current.wind_kph,
          cloud: response.data.current.cloud,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <DashboardCard title="Weather Forecast" className="col-span-2">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Sun className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-semibold">{currentWeather.temp_c}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{currentWeather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">{currentWeather.wind_kph} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Cloud Cover</p>
            <p className="font-semibold">{currentWeather.cloud}%</p>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default WeatherCard;
