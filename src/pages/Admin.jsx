import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaHome, FaExclamationCircle, FaSignInAlt, FaGraduationCap } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
import { RiShieldUserFill, RiUser3Fill } from "react-icons/ri";
import logo from "../assets/hpu1.webp";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const quotes = [
    "Education is the passport to the future.",
    "Learning is a treasure that follows its owner.",
    "The roots of education are bitter, but the fruit is sweet."
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

  // Dynamic theme variables
  const theme = {
    admin: {
      primary: "emerald",
      gradient: "from-emerald-600 to-emerald-800",
      light: "emerald-400",
      dark: "emerald-800",
      icon: <RiShieldUserFill className="text-emerald-400" />
    },
    student: {
      primary: "indigo",
      gradient: "from-indigo-600 to-indigo-800",
      light: "indigo-400",
      dark: "indigo-800",
      icon: <RiUser3Fill className="text-indigo-400" />
    }
  };

  const currentTheme = isAdmin ? theme.admin : theme.student;

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-${currentTheme.dark} p-4 sm:p-6`}>
      {/* Main Card Container - Responsive sizing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md relative"
      >
        {/* Background Glow Effect */}
        <div className={`absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-${currentTheme.light} to-${currentTheme.dark} rounded-lg opacity-15 blur-md animate-pulse`}></div>
        
        {/* Glass Card */}
        <div className="relative bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden shadow-xl">
          {/* Header Section - Responsive padding */}
          <div className={`relative bg-gradient-to-r ${currentTheme.gradient} p-4 sm:p-5`}>
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <motion.img 
                src={logo} 
                alt="Institution Logo"
                className="h-10 sm:h-12 mb-2 drop-shadow"
                whileHover={{ scale: 1.03 }}
              />
              <div className="flex items-center gap-2 sm:gap-3">
                {currentTheme.icon}
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {isAdmin ? "ADMIN" : "STUDENT"}
                </h1>
              </div>
              <motion.p 
                className="text-center text-white/80 text-xs sm:text-sm mt-1 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                "{randomQuote}"
              </motion.p>
            </div>
          </div>

          {/* Form Container - Responsive spacing */}
          <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
            {/* Role Toggle - Responsive size */}
            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-full text-white text-xs sm:text-sm border border-gray-700 hover:bg-gray-700/50 transition-all group overflow-hidden`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isAdmin ? "admin" : "student"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1"
                  >
                    <IoMdSwitch className="text-sm sm:text-base" />
                    {isAdmin ? "Student Login" : "Admin Login"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.div>

            {/* Error Message - Responsive size */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center bg-red-500/20 text-red-200 p-2 sm:p-3 rounded-lg border border-red-500/30 text-xs sm:text-sm">
                    <FaExclamationCircle className="mr-1.5 sm:mr-2" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form - Responsive elements */}
            <form onSubmit={handleLogin} className="space-y-2 sm:space-y-3">
              {/* Username Field */}
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-1"
              >
                <label className="text-xs sm:text-sm text-gray-400 ml-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaUser className="text-sm sm:text-base" />
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-800/50 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-${currentTheme.light} focus:border-transparent transition-all`}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <label className="text-xs sm:text-sm text-gray-400 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaLock className="text-sm sm:text-base" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-800/50 text-white placeholder-gray-500 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-${currentTheme.light} focus:border-transparent transition-all`}
                    required
                  />
                </div>
              </motion.div>

              {/* Submit Button - Responsive size */}
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                  loading 
                    ? `bg-${currentTheme.primary}-600 cursor-not-allowed` 
                    : `bg-gradient-to-r from-${currentTheme.primary}-500 to-${currentTheme.primary}-600 hover:from-${currentTheme.primary}-400 hover:to-${currentTheme.primary}-500`
                } text-white shadow flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="text-xs sm:text-sm" />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Home Link - Responsive size */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center pt-1 sm:pt-2"
            >
              <Link
                to="/"
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs sm:text-sm text-gray-400 hover:text-${currentTheme.light} transition-all`}
              >
                <FaHome className="text-xs sm:text-sm" />
                <span>Return Home</span>
              </Link>
            </motion.div>
          </div>

          {/* Footer - Responsive size */}
          <div className="px-4 sm:px-5 py-2 bg-gray-900/50 border-t border-gray-800 text-center">
            <div className="flex justify-center items-center gap-2 text-[0.6rem] sm:text-xs text-gray-500">
              <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-${currentTheme.primary}-500 animate-pulse`}></span>
              <span>Secure Access • {new Date().getFullYear()}</span>
              <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-${currentTheme.primary}-500 animate-pulse`}></span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;