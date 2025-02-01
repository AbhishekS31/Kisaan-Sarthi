import React from 'react';
import { GanttChartSquare, ArrowRight } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion } from 'framer-motion';

const schemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Direct income support of ₹6000 per year",
    deadline: "2024-04-30",
    status: "Active"
  },
  {
    id: 2,
    name: "Soil Health Card",
    description: "Free soil testing and recommendations",
    deadline: "2024-03-31",
    status: "Ending Soon"
  },
  {
    id: 3,
    name: "Crop Insurance",
    description: "Premium subsidy for crop protection",
    deadline: "2024-05-15",
    status: "Active"
  }
];

const GovSchemes = () => {
  return (
    <DashboardCard title="Government Schemes" className="col-span-2">
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg border border-green-100 bg-green-50 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <GanttChartSquare className="text-green-600" size={20} />
                  <h3 className="font-semibold text-green-900">{scheme.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-600">{scheme.description}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-xs text-gray-500">Deadline: {scheme.deadline}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    scheme.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                  }`}>
                    {scheme.status}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-green-600 hover:text-green-700"
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default GovSchemes;