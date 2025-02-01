import React, { useState } from 'react';
import { Mic, MessageSquare } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; type: 'user' | 'assistant' }>>([]);

  const handleMicClick = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setMessages(prev => [...prev, 
        { text: "What's the best time to plant wheat?", type: 'user' },
        { text: "Based on your location and current weather conditions, the best time to plant wheat would be in mid-October. This will allow the crop to establish before winter and maximize yield potential.", type: 'assistant' }
      ]);
    }, 2000);
  };

  return (
    <DashboardCard title="Kisaan Sahayak" className="col-span-2">
      <div className="h-64 overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMicClick}
          className={`p-4 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-green-500'
          } text-white shadow-lg`}
        >
          <Mic size={24} />
        </motion.button>
      </div>
    </DashboardCard>
  );
};

export default VoiceAssistant;