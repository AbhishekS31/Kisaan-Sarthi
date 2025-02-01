import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      {children}
    </motion.div>
  );
};

export default DashboardCard;