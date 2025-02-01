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

const maharashtraDistricts = [
  'Ahmednagar',
  'Akola',
  'Amravati',
  'Aurangabad',
  'Beed',
  'Bhandara',
  'Buldhana',
  'Chandrapur',
  'Dhule',
  'Gadchiroli',
  'Gandhinagar',
  'Hingoli',
  'Jalgaon',
  'Jalna',
  'Kolhapur',
  'Latur',
  'Mumbai City',
  'Mumbai Suburban',
  'Nagpur',
  'Nanded',
  'Nandurbar',
  'Nashik',
  'Osmanabad',
  'Palghar',
  'Parbhani',
  'Pune',
  'Raigad',
  'Ratnagiri',
  'Sangli',
  'Satara',
  'Sindhudurg',
  'Solapur',
  'Thane',
  'Wardha',
  'Washim',
  'Yavatmal',
];



const CropPlanning = () => {
  const [farmLocation, setFarmLocation] = useState({
    state: 'Maharashtra',
    district: '',
  });
  const [farmSize, setFarmSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [previousCrops, setPreviousCrops] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [laborAvailability, setLaborAvailability] = useState('');
  const [financialCondition, setFinancialCondition] = useState('');
  const [cropPreferences, setCropPreferences] = useState('');
  const [result , setResult] = useState({})
  // const [additionalConsiderations, setAdditionalConsiderations] = useState({
  //   climate: '',
  //   marketAccess: '',
  //   pestHistory: '',
  // });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all the fields are filled
    if (
      farmLocation.state &&
      farmLocation.district &&
      farmSize &&
      soilType &&
      previousCrops &&
      waterAvailability &&
      laborAvailability &&
      financialCondition &&
      cropPreferences
    ) {
      // Prepare the data object
      const formData = {
        farmLocation,
        farmSize,
        soilType,
        previousCrops,
        waterAvailability,
        laborAvailability,
        financialCondition,
        cropPreferences,
      };
  
      try {
        
        setIsAnalyzing(true)
        const response = await fetch('your-backend-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the formData object as a JSON string
        });
  
        // Handle the response
        if (response.ok) {
          const data = await response.json();
          setResult(data);
          console.log('Data successfully sent to backend:', data);

         
        } else {
          console.error('Error sending data to backend:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred during the fetch request:', error);
        // Handle fetch error
      } finally {
        // Reset the analyzing state
        setIsAnalyzing(false);
      }
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
              {/* Farm Location */}
              <div>
                <label
                  htmlFor="farm-state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="farm-state"
                  value="Maharashtra"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="farm-district"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  District
                </label>
                <select
                  id="farm-district"
                  value={farmLocation.district}
                  onChange={(e) =>
                    setFarmLocation({ ...farmLocation, district: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select district</option>
                  {maharashtraDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Farm Size */}
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

              {/* Soil Type */}
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

              {/* Previous Crops */}
              <div>
                <label
                  htmlFor="previous-crops"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Previous Crops Grown
                </label>
                <textarea
                  id="previous-crops"
                  value={previousCrops}
                  onChange={(e) => setPreviousCrops(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter previous crops grown"
                  rows={3}
                />
              </div>

              {/* Water Availability */}
              <div>
                <label
                  htmlFor="water-availability"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Water Availability
                </label>
                <select
                  id="water-availability"
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select water availability</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Irrigated">Irrigated</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              {/* Labor Availability */}
              <div>
                <label
                  htmlFor="labor-availability"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Labor Availability
                </label>
                <select
                  id="labor-availability"
                  value={laborAvailability}
                  onChange={(e) => setLaborAvailability(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select labor availability</option>
                  {['High', 'Medium', 'Low'].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Financial Condition */}
              <div>
                <label
                  htmlFor="financial-condition"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Financial Condition
                </label>
                <input
                  type="number"
                  id="financial-condition"
                  value={financialCondition}
                  onChange={(e) => setFinancialCondition(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter available budget"
                  min="0"
                  required
                />
              </div>

              {/* Crop Preferences */}
              <div>
                <label
                  htmlFor="crop-preferences"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Crop Preferences
                </label>
                <textarea
                  id="crop-preferences"
                  value={cropPreferences}
                  onChange={(e) => setCropPreferences(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your crop preferences"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
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
        onClick={() => { }}
      />
    </FeatureLayout>
  );
};

export default CropPlanning;
