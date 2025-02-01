import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion } from 'framer-motion';

const news = [
  {
    id: 1,
    title: "New Drought-Resistant Wheat Variety Released",
    source: "Agricultural Times",
    time: "2 hours ago",
    category: "Research",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&h=120"
  },
  {
    id: 2,
    title: "Government Announces Higher MSP for Rabi Crops",
    source: "Agri News Network",
    time: "5 hours ago",
    category: "Policy",
    image: "https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=200&h=120"
  }
];

const AgriNews = () => {
  return (
    <DashboardCard title="Agriculture News" className="col-span-2">
      <div className="space-y-4">
        {news.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Newspaper className="text-blue-500" size={16} />
                    <span className="text-xs text-blue-500 font-medium">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-1">{item.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default AgriNews;