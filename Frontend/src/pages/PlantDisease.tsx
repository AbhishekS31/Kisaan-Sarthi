import { useState } from 'react';
import axios from 'axios';
import { Upload, Scan, Leaf } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Upload className="h-8 w-8 text-green-600" />,
    title: 'Upload Image',
    description: 'Take or upload a photo of your plant',
  },
  {
    icon: <Scan className="h-8 w-8 text-green-600" />,
    title: 'AI Analysis',
    description: 'Our AI scans the image for diseases',
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: 'Get Results',
    description: 'Receive detailed diagnosis and treatment plan',
  },
];

const PlantDisease = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setIsAnalyzing(true);
      const response = await axios.post('http://172.16.44.59:5000/identify_disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error uploading the file:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <FeatureLayout
      title="Diagnose Your Crops with AI!"
      description="Upload a photo and get instant disease detection and treatment recommendations"
      backgroundImage="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
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
            <h3 className="text-2xl font-semibold mb-6 text-center">Try It Now</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer inline-block">
                <div className="mb-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <p className="text-gray-600 mb-2">
                  {selectedFile ? selectedFile.name : 'Click to upload an image'}
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG (max 10MB)
                </p>
              </label>
            </div>

            {previewUrl && (
              <div className="mt-6 text-center">
                <img
                  src={previewUrl}
                  alt="Selected Preview"
                  className="mx-auto h-48 w-48 object-cover rounded-md"
                />
              </div>
            )}

            {selectedFile && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleUploadClick}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Analyze Image
                </button>
              </div>
            )}

            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your image...</p>
              </motion.div>
            )}

            {analysisResult && (
              <div className="mt-6 text-center">
                <h4 className="text-xl font-semibold mb-4">Analysis Result:</h4>
                {/* Display the analysis result here */}
                <p>{analysisResult}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to protect your crops?"
        buttonText="Upload an Image Now"
        onClick={() => document.getElementById('image-upload')?.click()}
      />
    </FeatureLayout>
  );
};

export default PlantDisease;
