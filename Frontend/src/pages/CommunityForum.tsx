import { useEffect, useState } from 'react';
import { db, collection, getDocs, query, orderBy, addDoc } from "../firebase";  // Import addDoc to add new posts

import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp } from 'lucide-react';

const CommunityForum = () => {
  interface Post {
    id: string;
    title: string;
    author: string;
    timestamp: { seconds: number };
    replies?: number;
    likes?: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for handling modal visibility
  const [newPost, setNewPost] = useState({ title: '', content: '' });  // State for new post input

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        const postsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            author: data.author,
            timestamp: data.timestamp,
            replies: data.replies,
            likes: data.likes,
          };
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle the form submission for creating a new post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPostData = {
        title: newPost.title,
        content: newPost.content,
        author: 'Anonymous',  // Or get user info if authenticated
        timestamp: new Date(),
      };

      await addDoc(collection(db, 'posts'), newPostData);  // Add new post to Firestore

      // Close the modal and clear form fields
      setIsModalOpen(false);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Recent Discussions</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          onClick={() => setIsModalOpen(true)}  // Open modal when clicked
        >
          Start New Discussion
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search discussions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Modal for creating a new post */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl mb-4">Create New Post</h2>
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Content"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={() => setIsModalOpen(false)}  // Close modal
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Posts */}
      <div className="space-y-4">
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
