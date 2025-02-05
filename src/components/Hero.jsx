import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Motion Variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const parallaxEffect = {
  hidden: { y: 100 },
  visible: { y: 0, transition: { duration: 2, ease: "easeOut" } },
};

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial blur at 20% and opacity at 100%, then increases with scroll
  const initialBlur = 2; // Initial blur value
  const initialOpacity = 1; // Opacity stays at 100% initially
  const darkenAmount = Math.min(0.8, scrollPosition / 500); // Darkens as you scroll
  const blurAmount = Math.min(10, scrollPosition / 100); // Increases blur as you scroll

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#232526] to-[#414345] flex flex-col items-center justify-center text-center space-y-8 py-16">
      {/* Background Image with Scroll-based Darkening and Blurring */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          opacity: initialOpacity - darkenAmount,
          filter: `blur(${initialBlur + blurAmount}px)`,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Content Section */}
      <div className="relative z-10 space-y-8 max-w-4xl mx-auto px-6">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wide leading-tight drop-shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009fff] to-[#0066cc]">
            Unleash Your Creativity
          </span>
          <br />
          Build the Future, Today
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-200 font-light max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 1, duration: 1 }}
        >
          Start your learning journey with cutting-edge technologies. Embrace innovation and shape the future.
        </motion.p>

        <motion.div
          className="flex justify-center gap-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 255, 255, 0.4)",
              backgroundPosition: "right center",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-lg bg-gradient-to-r from-[#009fff] to-[#0066cc] text-white font-semibold rounded-full flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
          >
            <Link to="/courses">Start Your Journey</Link>
            <FaArrowRight className="text-xl" />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              backgroundPosition: "right center",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-lg bg-white text-gray-900 font-semibold rounded-full flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
          >
            <Link to="/learn">Explore More</Link>
            <FaArrowRight className="text-xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Parallax Scrolling Effect for Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
        variants={parallaxEffect}
        initial="hidden"
        animate="visible"
      >
        <p>Join a community of future leaders and innovators</p>
      </motion.div>
    </div>
  );
};

export default Hero;
