import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  RotateCcw,
  Building2,
  Cloud,
  TrendingUp,
  FlaskRound,
  Users,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "AI Plant Disease Detection",
    description: "Detect diseases via image upload with advanced AI analysis",
    route: "/features/plant-disease",
  },
  {
    icon: RotateCcw,
    title: "AI Crop Planning & Rotation",
    description: "Smart crop recommendations based on soil and climate data",
    route: "/features/crop-planning",
  },
  {
    icon: Building2,
    title: "Government Scheme Suggestions",
    description: "Find relevant schemes and support for farmers",
    route: "/features/government-schemes",
  },
  {
    icon: Cloud,
    title: "Real-time Weather Updates",
    description: "Live weather tracking & alerts for better planning",
    route: "/features/weather-updates",
  },
  {
    icon: TrendingUp,
    title: "Market Price Prediction",
    description: "Forecast & analyze farm market prices using AI",
    route: "/features/market-prediction",
  },
  {
    icon: FlaskRound,
    title: "AI Fertilizer Recommendations",
    description: "Optimal fertilizer usage advice for better yields",
    route: "/features/fertilizer-recommendation",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with farmers and share knowledge",
    route: "/features/community-forum",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Voice Chat",
    description: "Voice assistant for agricultural guidance",
    route: "/features/voice-chat",
  },
];

const FeatureCard = ({ icon: Icon, title, description, index, route }) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleNavigation = () => {
    if (route) navigate(route);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
        route ? "hover:bg-gray-100" : ""
      }`}
      onClick={handleNavigation}
    >
      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Farming
          </h2>
          <p className="text-xl text-gray-600">
            Discover how AI can transform your farming practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
