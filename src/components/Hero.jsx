import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import ChatBot from "./ChatBot";
import abstractBackground from "../assets/herobg.jpg"; // Replace with a modern abstract background

// Motion Variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const darkenAmount = Math.min(0.6, scrollPosition / 500);
  const blurAmount = Math.min(8, scrollPosition / 100);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
      {/* Split-Screen Background */}
      <div className="absolute inset-0 z-0 flex">
        <div
          className="w-1/2 h-full bg-gradient-to-r from-purple-600 to-indigo-700"
          style={{ opacity: 1 - darkenAmount }}
        />
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${abstractBackground})`,
            opacity: 1 - darkenAmount,
            filter: `blur(${blurAmount}px) brightness(${1 - darkenAmount})`,
          }}
        />
      </div>

      {/* Glass-Morphism Overlay */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 flex h-full">
        {/* Left Side - Text Content */}
        <motion.div
          className="w-1/2 flex flex-col justify-center pl-12 pr-6"
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
        >
          <motion.h1
            className="text-6xl font-bold text-white mb-6 leading-tight"
            variants={fadeIn}
          >
            Innovate. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Learn.</span> Grow.
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            Join the future of education. Explore cutting-edge programs, hands-on learning, and a community of innovators.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            variants={fadeIn}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/enroll"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Apply Now
              <FaArrowRight className="ml-2 text-lg" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg"
            >
              Explore Programs
              <FaArrowRight className="ml-2 text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side - Visuals */}
        <motion.div
          className="w-1/2 flex items-center justify-center pr-12"
          initial="hidden"
          animate="visible"
          variants={slideInRight}
        >
          <div className="relative w-full h-96">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-50 animate-float" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl opacity-50 animate-float-delay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-white bg-black/20 backdrop-blur-lg p-8 rounded-lg border border-white/10 shadow-lg">
                Future-Ready Education
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ChatBot - Positioning Fixed */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBot />
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 cursor-pointer animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.2, textShadow: "0px 0px 10px rgba(255,255,255,0.3)" }}
      >
        <FaChevronDown className="text-3xl" />
      </motion.div>
    </div>
  );
};

export default Hero;