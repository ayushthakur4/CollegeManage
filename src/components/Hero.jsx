import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaTimes, FaChartLine, FaUserGraduate, FaMobileAlt, FaClipboardCheck } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import ChatBot from "./ChatBot";
import abstractBackground from "../assets/herobg.jpg";

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 1, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    } 
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    } 
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 1, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    } 
  },
};

const bounce = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      delay: 2
    }
  }
};

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [showHighlights, setShowHighlights] = useState(false);
  const taglines = [
    "शिक्षा: सफलता की कुंजी",
    "उपस्थिति: अनुशासन की नींव",
    "Empowering Education",
    "Future-Ready Learning"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <FaClipboardCheck className="w-6 h-6" />, text: "Smart Attendance Tracking" },
    { icon: <FaChartLine className="w-6 h-6" />, text: "AI Performance Insights" },
    { icon: <FaUserGraduate className="w-6 h-6" />, text: "Student Analytics" },
    { icon: <FaMobileAlt className="w-6 h-6" />, text: "Cross-Platform Access" }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-green-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${abstractBackground})`,
          opacity: 0.15,
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side - Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          variants={slideInLeft}
        >
          {/* Tagline with Changing Effect */}
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight h-24 flex items-center justify-center md:justify-start"
            variants={fadeIn}
          >
            <motion.span
              key={currentTagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="absolute bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-300"
            >
              {taglines[currentTagline]}
            </motion.span>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            A next-generation platform leveraging AI to monitor student engagement, predict academic outcomes, and optimize institutional performance.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/learn"
              className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:shadow-xl transition-all duration-300 shadow-lg group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Documentation
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <button
              onClick={() => setShowHighlights(!showHighlights)}
              className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-transparent border-2 border-green-400/50 rounded-lg hover:bg-green-900/20 transition-all duration-300 shadow-lg group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {showHighlights ? 'Hide Features' : 'Show Features'}
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto md:mx-0"
            variants={fadeIn}
            transition={{ delay: 0.9 }}
          >
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "3s", label: "Load Time" },
              { value: "500+", label: "USERS PER DAY" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-green-400/10 text-center">
                <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Visuals */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center"
          variants={slideInRight}
        >
          <AnimatePresence>
            {showHighlights && (
              <motion.div 
                className="relative w-full max-w-md"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Card */}
                <motion.div 
                  className="bg-gradient-to-br from-gray-800/70 to-green-900/30 backdrop-blur-md rounded-2xl p-8 border border-green-400/20 shadow-2xl overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-300">
                      Platform Highlights
                    </h3>
                    <button 
                      onClick={() => setShowHighlights(false)}
                      className="text-green-300 hover:text-white transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-green-400/10 hover:border-green-400/30 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 p-2 bg-green-900/30 rounded-lg mr-4 text-green-400">
                          {feature.icon}
                        </div>
                        <span className="text-gray-200">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-500 rounded-full filter blur-xl opacity-20"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-400 rounded-full filter blur-xl opacity-20"></div>
                </motion.div>

                {/* Floating Notification */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-green-500/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-green-400/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="flex items-center">
                    <div className="bg-white/20 p-1 rounded-full mr-2">
                      <IoMdRocket className="text-white text-sm" />
                    </div>
                    <span className="text-xs font-medium">New AI features launched!</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ChatBot - Positioned Fixed */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBot />
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 cursor-pointer"
        variants={bounce}
        whileHover={{ scale: 1.2, color: "#4ade80" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Scroll Down</span>
          <FaChevronDown className="text-2xl animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
