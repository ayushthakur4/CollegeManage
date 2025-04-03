import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaHome, FaExclamationCircle, FaSignInAlt, FaGraduationCap } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
import logo from "../assets/hpu1.webp"; // Your logo file

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const quotes = [
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    "Learning is a treasure that will follow its owner everywhere.",
    "The beautiful thing about learning is that no one can take it away from you."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if ((isAdmin && username === "admin" && password === "1234") ||
        (!isAdmin && username === "student" && password === "1234")) {
      navigate(isAdmin ? "/dash" : "/student");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  // Dynamic color variables
  const primaryColor = isAdmin ? 'green' : 'blue';
  const gradientFrom = isAdmin ? 'from-green-600' : 'from-blue-600';
  const gradientTo = isAdmin ? 'to-green-800' : 'to-blue-800';
  const focusRing = isAdmin ? 'focus:ring-green-500' : 'focus:ring-blue-500';
  const buttonGradientFrom = isAdmin ? 'from-green-500' : 'from-blue-500';
  const buttonGradientTo = isAdmin ? 'to-green-600' : 'to-blue-600';
  const buttonHoverFrom = isAdmin ? 'hover:from-green-400' : 'hover:from-blue-400';
  const buttonHoverTo = isAdmin ? 'hover:to-green-500' : 'hover:to-blue-500';
  const iconColor = isAdmin ? 'text-green-400' : 'text-blue-400';
  const borderColor = isAdmin ? 'border-green-500/20' : 'border-blue-500/20';

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-${primaryColor}-900 p-4`}>
      {/* Glassmorphism Card with Dynamic Color */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10 ${isAdmin ? 'hover:shadow-green-500/20' : 'hover:shadow-blue-500/20'} transition-all`}
      >
        {/* Logo and Quote Section */}
        <div className="p-4 flex flex-col items-center bg-black/20">
          <motion.img 
            src={logo} 
            alt="Institution Logo"
            className="h-12 mb-3"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div 
            className="text-center text-white/80 text-xs italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            "{randomQuote}"
          </motion.div>
        </div>

        {/* Animated Header with Glow Effect */}
        <motion.div 
          className={`relative p-4 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
          whileHover={{ scale: 1.01 }}
        >
          <div className={`absolute -inset-1 bg-${primaryColor}-500 rounded-lg blur opacity-20 animate-pulse`}></div>
          <div className="relative z-10 flex items-center justify-center gap-2">
            <FaGraduationCap className="text-white/90" />
            <h1 className="text-xl font-bold text-white text-center">
              {isAdmin ? "ADMIN PORTAL" : "STUDENT PORTAL"}
            </h1>
          </div>
        </motion.div>

        {/* Form Container */}
        <div className="p-6 space-y-5">
          {/* Animated Role Switch */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full text-white text-sm border border-white/20 hover:bg-white/10 transition-all ${isAdmin ? 'hover:text-green-300' : 'hover:text-blue-300'}`}
            >
              <IoMdSwitch className="text-lg" />
              Switch to {isAdmin ? "Student" : "Admin"}
            </button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center bg-red-400/20 text-red-200 p-3 rounded-lg border border-red-400/30 text-sm"
            >
              <FaExclamationCircle className="mr-2 animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <motion.div 
              whileHover={{ x: 3 }}
              className="space-y-2"
            >
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${iconColor}`}>
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-black/20 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all`}
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              whileHover={{ x: 3 }}
              className="space-y-2"
            >
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${iconColor}`}>
                  <FaLock />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-black/20 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all`}
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                loading 
                  ? `bg-${primaryColor}-600 cursor-not-allowed` 
                  : `bg-gradient-to-r ${buttonGradientFrom} ${buttonGradientTo} ${buttonHoverFrom} ${buttonHoverTo}`
              } text-white shadow-lg flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Home Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center pt-2"
          >
            <Link
              to="/"
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white transition-all ${isAdmin ? 'hover:text-green-300' : 'hover:text-blue-300'}`}
            >
              <FaHome />
              Return to Homepage
            </Link>
          </motion.div>
        </div>

        {/* Futuristic Footer with Dynamic Color */}
        <div className={`p-3 bg-black/20 text-center text-xs text-white/50 border-t ${borderColor}`}>
          <div className="flex justify-center items-center gap-4">
            <span className={`h-2 w-2 rounded-full bg-${primaryColor}-500 animate-pulse`}></span>
            <span>Secure Access  • {new Date().getFullYear()}</span>
            <span className={`h-2 w-2 rounded-full bg-${primaryColor}-500 animate-pulse`}></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;