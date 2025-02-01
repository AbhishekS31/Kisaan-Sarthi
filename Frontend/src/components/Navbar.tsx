import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';


const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    navigate("/sign-in")
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      // Optionally, redirect the user after sign-out
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-800">KisanSarthi</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-blue-500 hover:text-green-600 font-bold  transition-colors">Home</a>
            <a href="#features" className="text-blue-500 hover:text-green-600 font-bold transition-colors">Features</a>
            <a href="#about" className="text-blue-500 hover:text-green-600 font-bold transition-colors">About Us</a>
            <a href="#contact" className="text-blue-500 hover:text-green-600 font-bold transition-colors">Contact</a>
            {isLoaded && (
              isSignedIn ? (
                <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Logout
                </button>
              ) : (
                <button onClick={handleAuthClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Login / Sign Up
                </button>
              )
            )}
          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;