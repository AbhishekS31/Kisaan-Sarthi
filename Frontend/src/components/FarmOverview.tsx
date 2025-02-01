import React from 'react';
import { Plane as Plant, Droplet, Thermometer, Activity } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <motion.div
      className={`h-2.5 rounded-full ${color}`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1 }}
    />
  </div>
);

const FarmOverview = () => {
  return (
    <DashboardCard title="Farm Overview" className="col-span-2">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plant className="text-green-500" />
            <span className="font-medium">Crop Health</span>
          </div>
          <ProgressBar value={85} color="bg-green-500" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-blue-500" />
            <span className="font-medium">Soil Moisture</span>
          </div>
          <ProgressBar value={70} color="bg-blue-500" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="text-red-500" />
            <span className="font-medium">Temperature</span>
          </div>
          <ProgressBar value={60} color="bg-red-500" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-purple-500" />
            <span className="font-medium">Growth Rate</span>
          </div>
          <ProgressBar value={75} color="bg-purple-500" />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-3">Current Crops</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Crop</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Growth Stage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Wheat</td>
                <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Healthy</span></td>
                <td className="px-4 py-2">Flowering</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Rice</td>
                <td className="px-4 py-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Needs Attention</span></td>
                <td className="px-4 py-2">Seedling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
};

export default FarmOverview;