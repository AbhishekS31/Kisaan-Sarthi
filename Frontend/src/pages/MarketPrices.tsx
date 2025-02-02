import React, { useState } from 'react';
import { TrendingUp, Map, Clock } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Map className="h-8 w-8 text-green-600" />,
    title: 'Select Region',
    description: 'Choose your market location',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    title: 'Price Analysis',
    description: 'View AI-predicted price trends',
  },
  {
    icon: <Clock className="h-8 w-8 text-green-600" />,
    title: 'Timing Advice',
    description: 'Get best selling time recommendations',
  },
];

const crops = [
  'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize',
  'Pulses', 'Soybeans', 'Groundnut', 'Mustard', 'Potato'
];



const MarketPrices = () => {
  const [crop, setCrop] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    // API call to analyze market prices
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/get_marketplace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          state,
          district,
        }),
      });
      const data = await response.json();
      console.log(data);
      setResult(data)
      setIsAnalyzing(false);

    } catch (error) {
      console.log(error)
    }
  };


  interface FormatTextProps {
    text: string;
  }
  const formatText = ({ text }: FormatTextProps) => {
    return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
    ));
  };

  return (
    <FeatureLayout
      title="Maximize Profits with AI Price Prediction"
      description="Get AI-powered market price predictions and selling recommendations"
      backgroundImage="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
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
              Check Market Prices
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
                  htmlFor="District"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State
                </label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'/>
              </div>
              <div>
                <label
                  htmlFor="District"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  District
                </label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent' />
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
                    Analyzing Market Data...
                  </div>
                ) : (
                  'Get Estimated Price '
                )}
              </motion.button>
            </form>

            {/* Price Trend Preview */}
            {result ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Estimated Prices : </h2>
                <div className="result-container">
                  <h1 className='text-lg font-bold '>₹ {result[0]}</h1>
                  <p>{formatText({ text: result[1] })}</p>
                </div>
              </div>
            ) : <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p>Select a crop and region to see price </p>
              </div>
            </div>}

          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to optimize your market timing?"
        buttonText="Get Price "
        onClick={() => { }}
      />
    </FeatureLayout>
  );
};

export default MarketPrices;