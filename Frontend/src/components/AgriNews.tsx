import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { motion } from 'framer-motion';

interface NewsItem {
  id: string;
  image_url: string;
  title: string;
  url: string;
}

const AgriNews = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from the backend when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://172.16.44.59:5000/api/news', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }); // replace with your backend API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        console.log(data);
        setNewsData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty array means this effect will only run once, on mount

  if (loading) {
    return <div>Loading...</div>; // Optional: show a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Optional: show error message if fetch fails
  }

  return (
    <DashboardCard title="Agriculture News" className="col-span-2">
      <div className="space-y-4 max-h-[400px] overflow-y-auto overflow-x-hidden"> {/* Prevent horizontal scroll */}
        {newsData.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Newspaper className="text-blue-500" size={16} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-1">{item.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
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
