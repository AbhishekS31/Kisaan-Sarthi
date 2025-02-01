import React, { useState } from 'react';
import { HeadingIcon as SeedingIcon, Calendar, LineChart } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <SeedingIcon className="h-8 w-8 text-green-600" />,
    title: 'Enter Farm Details',
    description: 'Provide your farm size and soil type',
  },
  {
    icon: <LineChart className="h-8 w-8 text-green-600" />,
    title: 'AI Analysis',
    description: 'Get AI-powered crop recommendations',
  },
  {
    icon: <Calendar className="h-8 w-8 text-green-600" />,
    title: 'Plan Your Season',
    description: 'Receive a detailed planting calendar',
  },
];

const soilTypes = [
  'Alluvial Soil',
  'Black Soil',
  'Red Soil',
  'Laterite Soil',
  'Desert Soil',
];

const CropPlanning = () => {
  const [farmSize, setFarmSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (farmSize && soilType) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <FeatureLayout
      title="Plan Your Crops Smarter with AI"
      description="Get personalized crop recommendations based on your farm's conditions"
      backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    >
      <HowItWorks steps={steps} />

      {/* Interactive Demo Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Get Your Personalized Crop Plan
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="farm-size"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Farm Size (in acres)
                </label>
                <input
                  type="number"
                  id="farm-size"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter farm size"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="soil-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Soil Type
                </label>
                <select
                  id="soil-type"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Generate Recommendations'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to optimize your farm's productivity?"
        buttonText="Generate Your Crop Plan"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default CropPlanning;