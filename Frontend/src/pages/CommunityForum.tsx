import { useState } from 'react'; // Just import necessary hooks or components
import { Users, MessageSquare, ThumbsUp } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: 'Join Community',
    description: 'Create your farmer profile',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    title: 'Ask Questions',
    description: 'Share your farming queries',
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-green-600" />,
    title: 'Get Answers',
    description: 'Receive expert solutions',
  },
];

const sampleDiscussions = [
  {
    title: 'Best practices for organic farming',
    author: 'Rajesh Kumar',
    replies: 15,
    likes: 32,
    time: '2 hours ago',
  },
  {
    title: 'How to deal with wheat rust disease?',
    author: 'Priya Patel',
    replies: 8,
    likes: 24,
    time: '4 hours ago',
  },
  {
    title: 'Recommended irrigation system for sugarcane',
    author: 'Mohammed Ali',
    replies: 12,
    likes: 28,
    time: '6 hours ago',
  },
];

const CommunityForum = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <FeatureLayout
      title="Join the Farming Community!"
      description="Connect with fellow farmers, share knowledge, and get expert advice"
      backgroundImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    >
      <HowItWorks steps={steps} />

      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold">Recent Discussions</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start New Discussion
              </motion.button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              {sampleDiscussions.map((discussion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {discussion.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Posted by {discussion.author} • {discussion.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {discussion.replies}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {discussion.likes}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                Load More Discussions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <CallToAction
        title="Ready to join the farming community?"
        buttonText="Join the Conversation"
        onClick={() => {}}
      />
    </FeatureLayout>
  );
};

export default CommunityForum;
