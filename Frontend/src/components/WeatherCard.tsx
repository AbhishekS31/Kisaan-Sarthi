import React from 'react';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weatherData = [
  { day: 'Mon', temp: 28, humidity: 65 },
  { day: 'Tue', temp: 30, humidity: 62 },
  { day: 'Wed', temp: 29, humidity: 70 },
  { day: 'Thu', temp: 27, humidity: 75 },
  { day: 'Fri', temp: 26, humidity: 68 },
];

const WeatherCard = () => {
  return (
    <DashboardCard title="Weather Forecast" className="col-span-2">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Sun className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-semibold">28°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">12 km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Cloud Cover</p>
            <p className="font-semibold">20%</p>
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