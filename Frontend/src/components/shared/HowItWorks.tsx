import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12"
      >
        How It Works
      </motion.h2>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="text-center"
          >
            <div className="h-16 w-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;