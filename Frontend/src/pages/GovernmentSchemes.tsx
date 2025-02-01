import React, { useState } from 'react';
import { FileText, Search, CheckCircle } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-green-600" />,
    title: 'Enter Details',
    description: 'Provide your farm and location information',
  },
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: 'AI Analysis',
    description: 'AI matches you with eligible schemes',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    title: 'Apply Now',
    description: 'Apply directly through our platform',
  },
];

const states = [
  'Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

const farmTypes = [
  'Small (< 2 hectares)',
  'Medium (2-5 hectares)',
  'Large (> 5 hectares)'
];

const GovernmentSchemes = () => {
  const [state, setState] = useState('');
  const [farmType, setFarmType] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state && farmType) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
      }, 2000);
    }
  };

  return (
    <FeatureLayout
      title="Discover Government Schemes for You"
      description="Find and apply for government schemes tailored to your farming needs"
      backgroundImage="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
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
              Find Eligible Schemes
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="farm-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Farm Type
                </label>
                <select
                  id="farm-type"
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select farm type</option>
                  {farmTypes.map((type) => (
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
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching Schemes...
                  </div>
                ) : (
                  'Find Eligible Schemes'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to access government support?"
        buttonText="Find My Schemes"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default GovernmentSchemes;