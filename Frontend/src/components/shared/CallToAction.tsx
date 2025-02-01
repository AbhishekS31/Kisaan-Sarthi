import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ title, buttonText, onClick }) => {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          {title}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center hover:bg-green-700 transition-colors"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
    </section>
  );
};

export default CallToAction;