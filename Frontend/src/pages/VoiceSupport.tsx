import  { useState } from 'react';
import { Mic, MessageSquare, Play } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Mic className="h-8 w-8 text-green-600" />,
    title: 'Ask a Question',
    description: 'Speak your farming query',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    title: 'AI Processing',
    description: 'AI analyzes your question',
  },
  {
    icon: <Play className="h-8 w-8 text-green-600" />,
    title: 'Get Answer',
    description: 'Receive voice guidance',
  },
];

const VoiceSupport = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
        }, 2000);
      }, 3000);
    }
  };

  return (
    <FeatureLayout
      title="Talk to Your AI Farming Assistant"
      description="Get instant voice-based answers to all your farming questions"
      backgroundImage="https://images.unsplash.com/photo-1591628001888-76cc02e0c276?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
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
              Ask Your Question
            </h3>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecordClick}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                  isRecording
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <Mic className="h-8 w-8 text-white" />
              </motion.button>

              <p className="mt-4 text-gray-600">
                {isRecording
                  ? 'Recording... Tap to stop'
                  : isProcessing
                  ? 'Processing your question...'
                  : 'Tap to start recording'}
              </p>

              {isProcessing && (
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              )}
            </div>

            {/* Sample Questions */}
            <div className="mt-12">
              <h4 className="text-lg font-semibold mb-4">Sample Questions:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Play className="h-4 w-4 mr-2 text-green-600" />
                  "When should I plant wheat in Punjab?"
                </li>
                <li className="flex items-center">
                  <Play className="h-4 w-4 mr-2 text-green-600" />
                  "How to control pests in cotton?"
                </li>
                <li className="flex items-center">
                  <Play className="h-4 w-4 mr-2 text-green-600" />
                  "What fertilizer is best for tomatoes?"
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to get voice-based farming guidance?"
        buttonText="Ask KisanSarthi"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default VoiceSupport;