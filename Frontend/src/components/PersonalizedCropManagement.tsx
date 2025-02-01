import React, { useState } from 'react';
import { PlusCircle, Plane as Plant, Droplet, Sprout } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion, AnimatePresence } from 'framer-motion';

interface CropData {
  name: string;
  season: string;
  region: string;
  soilType: string;
  irrigation: string;
  expectedYield: string;
}

interface CropInsights {
  bestPractices: string[];
  predictions: {
    yield: string;
    optimalTemp: string;
    growthDuration: string;
  };
  recommendations: {
    water: string;
    fertilizer: string;
  };
}

const PersonalizedCropManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [crops, setCrops] = useState<Array<CropData & { insights: CropInsights }>>([]);

  const generateInsights = (cropData: CropData): CropInsights => {
    // Simulate AI-generated insights
    return {
      bestPractices: [
        `Maintain soil pH between 6.0-7.0 for optimal ${cropData.name} growth`,
        `Regular monitoring of soil moisture levels`,
        `Apply organic mulch to conserve water`,
      ],
      predictions: {
        yield: `${parseInt(cropData.expectedYield) + 2} quintals/acre`,
        optimalTemp: '25-30°C',
        growthDuration: '90-120 days',
      },
      recommendations: {
        water: `${cropData.irrigation === 'Drip' ? '2-3' : '4-5'} liters/day/plant`,
        fertilizer: 'NPK 14-14-14 in early stages, switching to 20-10-10 during flowering',
      },
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cropData: CropData = {
      name: formData.get('name') as string,
      season: formData.get('season') as string,
      region: formData.get('region') as string,
      soilType: formData.get('soilType') as string,
      irrigation: formData.get('irrigation') as string,
      expectedYield: formData.get('expectedYield') as string,
    };

    const insights = generateInsights(cropData);
    setCrops([...crops, { ...cropData, insights }]);
    setShowForm(false);
  };

  return (
    <DashboardCard title="Personalized Crop Management" className="col-span-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm(true)}
        className="w-full mb-6 p-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
      >
        <PlusCircle size={20} />
        Add New Crop
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Crop</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Crop Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Season</label>
                  <select
                    required
                    name="season"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                    <option value="Zaid">Zaid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <input
                    required
                    name="region"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Soil Type</label>
                  <select
                    required
                    name="soilType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="Loamy">Loamy</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Clay">Clay</option>
                    <option value="Silt">Silt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Irrigation Type</label>
                  <select
                    required
                    name="irrigation"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Flood">Flood Irrigation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Yield (quintals/acre)</label>
                  <input
                    required
                    name="expectedYield"
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
                  >
                    Add Crop
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {crops.map((crop, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-green-100 rounded-lg overflow-hidden"
          >
            <div className="bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plant className="text-green-600" size={20} />
                  <h3 className="font-semibold text-green-900">{crop.name}</h3>
                </div>
                <span className="text-sm text-green-600">{crop.season} Season</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Sprout size={16} />
                  Best Practices
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {crop.insights.bestPractices.map((practice, i) => (
                    <li key={i}>{practice}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Predictions</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-gray-500">Expected Yield</p>
                    <p className="font-medium">{crop.insights.predictions.yield}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-gray-500">Optimal Temperature</p>
                    <p className="font-medium">{crop.insights.predictions.optimalTemp}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-gray-500">Growth Duration</p>
                    <p className="font-medium">{crop.insights.predictions.growthDuration}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Droplet size={16} />
                  Recommendations
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-blue-600">Water Requirements</p>
                    <p className="font-medium">{crop.insights.recommendations.water}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-green-600">Fertilizer Plan</p>
                    <p className="font-medium">{crop.insights.recommendations.fertilizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default PersonalizedCropManagement;