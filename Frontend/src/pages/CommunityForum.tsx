import { useEffect, useState } from 'react';
import { db, collection, getDocs, query, orderBy, addDoc } from "../firebase";
import { motion } from 'framer-motion';
import { Users, MessageSquare, ThumbsUp, X } from 'lucide-react';
import FeatureLayout from '../components/shared/FeatureLayout';
import HowItWorks from '../components/shared/HowItWorks';
import CallToAction from '../components/shared/CallToAction';

const steps = [
  { icon: <Users className="h-8 w-8 text-green-600" />, title: 'Join Community', description: 'Create your farmer profile' },
  { icon: <MessageSquare className="h-8 w-8 text-green-600" />, title: 'Ask Questions', description: 'Share your farming queries' },
  { icon: <ThumbsUp className="h-8 w-8 text-green-600" />, title: 'Get Answers', description: 'Receive expert solutions' },
];

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: any;
  replies: number;
  likes: number;
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
            content: data.content,
            author: data.author,
            timestamp: data.timestamp,
            replies: data.replies || 0,
            likes: data.likes || 0,
          };
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post submission
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPostData = {
        title: newPost.title,
        content: newPost.content,
        author: 'Anonymous',
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'posts'), newPostData);
      setIsModalOpen(false);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle opening and closing discussion popup
  const handleOpenPost = (post: Post) => setSelectedPost(post);
  const handleClosePost = () => setSelectedPost(null);

  return (
    <FeatureLayout
      title="Join the Farming Community!"
      description="Connect with fellow farmers, share knowledge, and get expert advice"
      backgroundImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    >
      <HowItWorks steps={steps} />

      <section className="py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Recent Discussions</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => setIsModalOpen(true)}
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
            {posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleOpenPost(post)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-600">Posted by {post.author} • {new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.replies}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Ready to join the farming community?"
        buttonText="Join the Conversation"
        onClick={() => {}}
      />

      {/* Modal for New Post */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl mb-4">Create New Post</h2>
            <form onSubmit={handleCreatePost}>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4"
                rows={4}
              />
              <div className="flex justify-between mt-4">
                <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Create Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing a Post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold">{selectedPost.title}</h2>
            <p className="text-gray-600">{selectedPost.content}</p>
            <button onClick={handleClosePost} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </FeatureLayout>
  );
};

export default CommunityForum;
