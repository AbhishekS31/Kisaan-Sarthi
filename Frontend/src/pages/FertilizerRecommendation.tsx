import React, { useState } from 'react';
import { FlaskRound as Flask, Sprout, Droplet } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Sprout className="h-8 w-8 text-green-600" />,
    title: 'Select Crop',
    description: 'Choose your crop type',
  },
  {
    icon: <Flask className="h-8 w-8 text-green-600" />,
    title: 'AI Analysis',
    description: 'Get fertilizer recommendations',
  },
  {
    icon: <Droplet className="h-8 w-8 text-green-600" />,
    title: 'Application Guide',
    description: 'Learn how to apply properly',
  },
];

const crops = [
  'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize',
  'Tomato', 'Potato', 'Onion', 'Chilli', 'Soybean'
];

const soilTypes = [
  'Alluvial Soil',
  'Black Soil',
  'Red Soil',
  'Laterite Soil',
  'Desert Soil',
];

const FertilizerRecommendation = () => {
  const [crop, setCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crop && soilType) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <FeatureLayout
      title="Boost Your Yield with AI Fertilizer Guidance"
      description="Get personalized fertilizer recommendations for optimal crop growth"
      backgroundImage="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
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
              Get Fertilizer Recommendations
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="crop"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Crop
                </label>
                <select
                  id="crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select crop</option>
                  {crops.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
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
                  'Get Recommendations'
                )}
              </motion.button>
            </form>

            {/* Recommendations Preview */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Flask className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p>Select crop and soil type to get fertilizer recommendations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to optimize your fertilizer usage?"
        buttonText="Find My Fertilizer"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default FertilizerRecommendation;