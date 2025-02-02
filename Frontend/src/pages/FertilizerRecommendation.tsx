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

const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 'Potato', 'Onion', 'Chilli', 'Soybean'];
const soilTypes = ['Alluvial Soil', 'Black Soil', 'Red Soil', 'Laterite Soil', 'Desert Soil'];
const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];
const districts = [
 "NANDED", "DHULE", "AMRAVATI", "JALGAON", "Chhatrapati Sambhajinagar", "NASHIK", "SATARA", "PUNE", "SINDHUDURG", "NANDURBAR", "NAGPUR", "WASHIM", "RAIGAD", "AKOLA", "LATUR", "AHMEDNAGAR", "CHANDRAPUR", "WARDHA", "GADCHIROLI", "SANGLI", "HINGOLI", "PARBHANI", "DHARASHIV", "SOLAPUR", "RATNAGIRI", "BULDHANA", "KOLHAPUR", "THANE", "BEED", "BHANDARA", "JALNA", "YAVATMAL", "PALGHAR", "GONDIA"
]

const FertilizerRecommendation = () => {
  // const [crop, setCrop] = useState('');
  const [cropName, setCropName] = useState('');
  const [soilType, setSoilType] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [state] = useState('Maharashtra');
  const [district, setDistrict] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [budget, setBudget] = useState("")
  const [result, setResult] = useState("")

  const API_KEY = "a6df87d5cd2b417dbb493914250102"

  const fetchTemperature = async () => {

    if (!district) return;
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${district}`);
      const data = await response.json();
      setTemperature(data.current.temp_c);
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (soilType && growthStage && district && rainfall) {
      setIsAnalyzing(true);
      await fetchTemperature();

      const requestData = {
        cropName,
        soilType,
        growthStage,
        state,
        district,
        rainfall,
        budget
        // temperature,
      };

      console.log('Sending data to backend:', requestData);
      // Replace with actual backend API
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/get_fertilizers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => setResult(data))

        setIsAnalyzing(false);
      } catch (error) {
        console.log(error)
        setIsAnalyzing(false)
      }
    }
  };

   // to convert /n to </br>
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
    <FeatureLayout title="Boost Your Yield with AI Fertilizer Guidance" description="Get personalized fertilizer recommendations for optimal crop growth" backgroundImage="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80">
      <HowItWorks steps={steps} />
      <section className="py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Get Fertilizer Recommendations</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* <input type="text" placeholder="Crop Name" value={cropName} onChange={(e) => setCropName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required /> */}
              <select value={cropName} onChange={(e) => setCropName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                <option value="">Select crop</option>
                {crops.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
              <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                <option value="">Select soil type</option>
                {soilTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
              </select>
              <select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                <option value="">Select growth stage</option>
                {growthStages.map((stage) => (<option key={stage} value={stage}>{stage}</option>))}
              </select>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                <option value="">Select district</option>
                {districts.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
              <select value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required >
                <option value="">Select rainfall</option>
                {["very low ", "low", "medium", "high", "very high"].map((d) => (<option key={d} value={d}>{d}</option>))}

              </select>
              <input type="number" placeholder='enter your approx. budget ' value={budget} onChange={(e) => setBudget(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-lg' required />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Get Recommendations'}
              </motion.button>
            </form>

            {result && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Here are best Possible Solutions 4 U </h2>
                <div className="result-container">
                {result && formatText({ text: result })}
              </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <CallToAction title="Ready to optimize your fertilizer usage?" buttonText="Find My Fertilizer" onClick={() => { }} />
    </FeatureLayout>
  );
};

export default FertilizerRecommendation;
