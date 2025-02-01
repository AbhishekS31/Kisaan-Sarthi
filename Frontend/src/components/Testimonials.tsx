import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Punjab',
    quote: 'KisanSarthi has revolutionized how I manage my farm. The AI recommendations are incredibly accurate!'
  },
  {
    name: 'Priya Patel',
    location: 'Gujarat',
    quote: 'The disease detection feature saved my crop this season. This app is a game-changer for farmers.'
  },
  {
    name: 'Mohammed Ali',
    location: 'Maharashtra',
    quote: 'The weather alerts and market predictions help me make better decisions for my farm.'
  }
];

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Farmers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from our farming community
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold text-gray-800">{testimonial.name}</div>
              <div className="text-green-600">{testimonial.location}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;