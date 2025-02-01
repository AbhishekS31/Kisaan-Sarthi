import { useEffect, useState } from 'react';
import { db, collection, getDocs, addDoc, query, orderBy } from "../firebase";
import { where } from "firebase/firestore";
import { motion } from 'framer-motion';
import { Users, MessageSquare, ThumbsUp } from 'lucide-react';
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
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  timestamp: any;
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [replies, setReplies] = useState<{ [postId: string]: Reply[] }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newReply, setNewReply] = useState("");

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Fetch replies for a specific post
  const fetchReplies = async (postId: string) => {
    try {
      const q = query(collection(db, 'replies'), where("postId", "==", postId), orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const repliesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];

      setReplies(prevReplies => ({ ...prevReplies, [postId]: repliesData }));
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

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

  // Handle opening a post and loading replies
  const handleOpenPost = async (post: Post) => {
    setSelectedPost(post);
    await fetchReplies(post.id);
  };

  // Handle closing a post
  const handleClosePost = () => {
    setSelectedPost(null);
    setNewReply("");
  };

  // Handle submitting a reply
  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPost) return;

    try {
      const newReplyData = {
        postId: selectedPost.id,
        content: newReply,
        author: "Anonymous",
        timestamp: new Date(),
      };
      await addDoc(collection(db, "replies"), newReplyData);
      setNewReply("");
      await fetchReplies(selectedPost.id);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

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
            {posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
              <motion.div
                key={post.id}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleOpenPost(post)}
              >
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-sm text-gray-600">Posted by {post.author} • {new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title="Join the Farming Community Today!" buttonText="Join Now" onClick={() => {}} />

      {/* Modal for Viewing a Post and Replies */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold">{selectedPost.title}</h2>
            <p className="text-gray-600">{selectedPost.content}</p>

            {/* Replies Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Replies</h3>
              <div className="space-y-2 mt-2">
                {replies[selectedPost.id]?.map(reply => (
                  <div key={reply.id} className="p-2 border rounded-md">
                    <p className="text-sm text-gray-700">{reply.content}</p>
                    <p className="text-xs text-gray-500">By {reply.author} • {new Date(reply.timestamp.seconds * 1000).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleReplySubmit} className="mt-4">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={2}
                />
                <button type="submit" className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg">Reply</button>
              </form>
            </div>

            <button onClick={handleClosePost} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </FeatureLayout>
  );
};

export default CommunityForum;
