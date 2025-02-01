import { useEffect, useState } from 'react';
import { db } from './firebase';  // Import Firebase configuration
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Users, MessageSquare, ThumbsUp } from 'lucide-react'; // For icons in the UI

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from Firestore
  useEffect(() => {
    // Create a Firestore query to get all posts
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        // Map through the snapshot and create an array of post objects
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, []); // Empty array ensures this runs only once when the component mounts

  return (
    <div className="max-w-4xl mx-auto p-8">
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
        {/* Loop through the posts and display them */}
        {posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h4>
                <p className="text-sm text-gray-600">Posted by {post.author} • {new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.replies || 0}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.likes || 0}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
