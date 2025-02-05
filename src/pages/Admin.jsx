import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome, FaExclamationCircle } from "react-icons/fa";
import { RiAdminFill, RiUserFill } from "react-icons/ri";
import logo from "../assets/hpu1.webp";
import bgVideo from "../assets/log.mp4";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      (isAdmin && username === "admin" && password === "1234") ||
      (!isAdmin && username === "student" && password === "1234")
    ) {
      navigate(isAdmin ? "/dash" : "/student");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Login Card */}
      <motion.div 
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden relative z-10"
        initial={{ scale: 0.95, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Header Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-block"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ repeat: Infinity, duration: 8 }}
          >
            <img 
              src={logo} 
              alt="Logo"
              className="h-20 w-20 mx-auto mb-4 drop-shadow-lg"
            />
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isAdmin ? "Admin Portal" : "Student Portal"}
          </motion.h1>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="p-8 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Role Selector */}
          <motion.div variants={itemVariants}>
            <div className="flex gap-2 bg-blue-50 p-1 rounded-full">
              <motion.button
                onClick={() => setIsAdmin(true)}
                className={`flex-1 py-2 rounded-full transition-all ${
                  isAdmin 
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiAdminFill className="inline-block mr-2" />
                Admin
              </motion.button>
              <motion.button
                onClick={() => setIsAdmin(false)}
                className={`flex-1 py-2 rounded-full transition-all ${
                  !isAdmin 
                    ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiUserFill className="inline-block mr-2" />
                Student
              </motion.button>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <FaExclamationCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="flex justify-between items-center"
              variants={itemVariants}
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl transition-transform hover:scale-[1.02] relative overflow-hidden"
              >
                {loading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Signing In...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Sign In
                  </motion.span>
                )}
                {loading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear"
                    }}
                  />
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>

      {/* Animated Home Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <Link
          to="/"
          className="p-4 bg-white/90 backdrop-blur-sm shadow-2xl rounded-full border-2 border-blue-600 hover:border-blue-700 transition-all flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHome className="text-3xl text-blue-600 hover:text-blue-700" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Admin;