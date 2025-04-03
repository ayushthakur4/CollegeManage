import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiBell } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaFileDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import lg from "../assets/logo.webp";

const Navbar = ({ scrollToWhatWeAre }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentCornerOpen, setIsStudentCornerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNoticesOpen, setIsMobileNoticesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false);
  const [textColor, setTextColor] = useState("text-white");

  useEffect(() => {
    const savedNotices = localStorage.getItem("notices");
    if (savedNotices) setNotices(JSON.parse(savedNotices));
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // Detect background color and set appropriate text color
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.bottom > 0) {
          const bgColor = window.getComputedStyle(heroSection).backgroundColor;
          const isLight = bgColor.includes("255, 255, 255") || bgColor.includes("white");
          setTextColor(isLight ? "text-gray-900" : "text-white");
        } else {
          setTextColor(isScrolled ? "text-white" : "text-white");
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBcaClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/student");
    } else {
      alert("Please login as STUDENT to access this page.");
      navigate("/login");
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleContactUsClick = () => {
    window.location.href = "mailto:thakurayush9950@gmail.com";
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-gray-900/80 via-gray-800/50 to-transparent backdrop-blur-sm"
      } ${textColor} font-sans`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo with Holographic Effect */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center p-2 cursor-pointer relative group"
        >
          <img
            src={lg}
            alt="Logo"
            className="w-44 h-12 object-contain filter drop-shadow-[0_0_10px_rgba(16,185,129,0.7)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]"
          />
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                "conic-gradient(from 0deg, rgba(16,185,129,0.2), transparent 20%)",
                "conic-gradient(from 90deg, rgba(16,185,129,0.2), transparent 20%)",
                "conic-gradient(from 180deg, rgba(16,185,129,0.2), transparent 20%)",
                "conic-gradient(from 270deg, rgba(16,185,129,0.2), transparent 20%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          <NavLink 
            to="/courses" 
            label="Courses" 
            isActive={location.pathname === "/courses"} 
            onClick={handleNavClick} 
            textColor={textColor}
          />
          
          {/* Student Corner Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsStudentCornerOpen(true)}
            onMouseLeave={() => setIsStudentCornerOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.05, color: "#10b981" }}
              className={`flex items-center space-x-2 font-semibold tracking-wide ${textColor} hover:text-green-400`}
            >
              <RiGraduationCapLine className={`text-2xl ${textColor === 'text-gray-900' ? 'text-green-600' : 'text-green-400'} drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]`} />
              <span>Student</span>
              <FiChevronDown
                className={`transition-transform duration-300 ${isStudentCornerOpen ? "rotate-180" : ""}`}
              />
            </motion.button>
            <AnimatePresence>
              {isStudentCornerOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0, y: -10 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  exit={{ opacity: 0, scaleY: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-4 w-64 bg-gray-900/98 rounded-2xl shadow-[0_8px_30px_rgba(16,185,129,0.2)] border border-green-500/40 p-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-gray-900" />
                  <button
                    onClick={handleBcaClick}
                    className="relative w-full px-4 py-3 text-left font-medium text-gray-100 hover:bg-green-500/30 hover:text-green-300 transition-all duration-200 rounded-lg"
                  >
                    BCA Program
                  </button>
                  <button
                    onClick={() => handleNavClick("/courses")}
                    className="relative w-full px-4 py-3 text-left font-medium text-gray-100 hover:bg-green-500/30 hover:text-green-300 transition-all duration-200 rounded-lg"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => handleNavClick("/enroll")}
                    className="relative w-full px-4 py-3 text-left font-medium text-gray-100 hover:bg-green-500/30 hover:text-green-300 transition-all duration-200 rounded-lg"
                  >
                    Admission
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink 
            to="/learn" 
            label="About Us" 
            onClick={() => { handleNavClick("/learn"); scrollToWhatWeAre(); }} 
            textColor={textColor}
          />
          <NavLink 
            to="#" 
            label="Contact Us" 
            onClick={handleContactUsClick} 
            textColor={textColor}
          />

          {/* Notification Bell with Digital Pulse */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNoticeBoxVisible(!isNoticeBoxVisible)}
              className={`p-2.5 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 ${
                textColor === 'text-gray-900' ? 'text-green-600' : 'text-green-400'
              } hover:text-green-300 transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.6)] relative overflow-hidden`}
            >
              <FiBell className="text-2xl" />
              <motion.div
                className="absolute inset-0 bg-green-500/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {notices.length > 0 && (
                <motion.span 
                  className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
            <AnimatePresence>
              {isNoticeBoxVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-16 right-0 w-96 bg-gray-900/98 rounded-2xl shadow-[0_8px_30px_rgba(16,185,129,0.2)] p-6 border border-green-500/40 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-gray-900" />
                  <h2 className="relative text-xl font-bold text-green-400 mb-5 tracking-tight drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]">
                    Latest Notices
                  </h2>
                  {notices.length === 0 ? (
                    <div className="relative text-center text-gray-300 font-medium">No notices published yet.</div>
                  ) : (
                    <div className="relative space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-gray-800/50">
                      {notices.map((notice, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                          className="flex items-center justify-between bg-gray-800/60 p-4 rounded-xl transition-all duration-200 border border-green-500/20"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-sm tracking-tight">{notice.title}</h3>
                            <p className="text-xs text-gray-400">{notice.fileName} - {notice.date}</p>
                          </div>
                          <a
                            href={notice.file}
                            download
                            className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                          >
                            <FaFileDownload size={20} />
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login/Logout Button with Digital Glow */}
          {localStorage.getItem("isLoggedIn") ? (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-2.5 font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 tracking-wide text-white"
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("/login")}
              className="px-6 py-2.5 font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 tracking-wide text-white"
            >
              Login/Signup
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button with Holographic Effect */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-3 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 ${
            textColor === 'text-gray-900' ? 'text-green-600' : 'text-green-400'
          } hover:text-green-300 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)] relative overflow-hidden`}
        >
          {isMobileMenuOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
          <motion.div
            className="absolute inset-0 bg-green-500/30 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu - Futuristic Slide-in Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 z-50 shadow-[0_0_25px_rgba(16,185,129,0.5)] border-l border-green-500/40"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 text-4xl text-green-400 hover:text-green-300 transition-colors duration-200"
              >
                <FiX />
              </motion.button>
              <div className="space-y-6 mt-16">
                <MobileNavLink to="/courses" label="Courses" onClick={() => handleNavClick("/courses")} />
                <div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsStudentCornerOpen(!isStudentCornerOpen)}
                    className="w-full flex justify-between p-4 font-semibold text-gray-100 hover:bg-green-500/30 hover:text-green-300 rounded-xl transition-all duration-200"
                  >
                    <span>Student Corner</span>
                    <FiChevronDown
                      className={`transition-transform duration-300 ${isStudentCornerOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>
                  <AnimatePresence>
                    {isStudentCornerOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-2 space-y-2 pl-4"
                      >
                        <MobileNavLink to="#" label="BCA Program" onClick={handleBcaClick} />
                        <MobileNavLink to="/courses" label="Syllabus" onClick={() => handleNavClick("/courses")} />
                        <MobileNavLink to="/enroll" label="Admissions" onClick={() => handleNavClick("/enroll")} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <MobileNavLink to="/learn" label="About Us" onClick={() => { handleNavClick("/learn"); scrollToWhatWeAre(); }} />
                <MobileNavLink to="#" label="Contact Us" onClick={handleContactUsClick} />
                <div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileNoticesOpen(!isMobileNoticesOpen)}
                    className="w-full flex justify-between p-4 font-semibold text-gray-100 hover:bg-green-500/30 hover:text-green-300 rounded-xl transition-all duration-200"
                  >
                    <span>Notices</span>
                    <FiChevronDown
                      className={`transition-transform duration-300 ${isMobileNoticesOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>
                  <AnimatePresence>
                    {isMobileNoticesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-2 bg-gray-800/95 p-4 rounded-2xl shadow-inner border border-green-500/30"
                      >
                        <h2 className="text-lg font-bold text-green-400 mb-3 tracking-tight">Latest Notices</h2>
                        {notices.length === 0 ? (
                          <div className="text-center text-gray-300 font-medium">No notices published yet.</div>
                        ) : (
                          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-gray-800/50">
                            {notices.map((notice, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between bg-gray-700/60 p-3 rounded-lg hover:bg-green-500/20 transition-all duration-200 border border-green-500/20"
                              >
                                <div className="flex-1">
                                  <h3 className="font-semibold text-white text-sm tracking-tight">{notice.title}</h3>
                                  <p className="text-xs text-gray-400">{notice.fileName} - {notice.date}</p>
                                </div>
                                <a
                                  href={notice.file}
                                  download
                                  className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                                >
                                  <FaFileDownload size={18} />
                                </a>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="mt-8">
                {localStorage.getItem("isLoggedIn") ? (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full px-6 py-3 font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 tracking-wide text-white"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick("/login")}
                    className="w-full px-6 py-3 font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 tracking-wide text-white"
                  >
                    Login/Signup
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ to, label, isActive, onClick, textColor }) => (
  <motion.button
    onClick={() => onClick(to)}
    whileHover={{ scale: 1.05, color: "#10b981", textShadow: "0 0 10px rgba(16, 185, 129, 0.6)" }}
    className={`font-semibold text-lg tracking-wide transition-all duration-300 ${
      isActive ? "text-green-400" : textColor === 'text-gray-900' ? "text-gray-900 hover:text-green-600" : "text-gray-100 hover:text-green-400"
    }`}
  >
    {label}
  </motion.button>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <motion.button
    onClick={() => onClick(to)}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.25)" }}
    className="block w-full text-left p-4 font-semibold text-gray-100 hover:text-green-300 rounded-xl transition-all duration-200 tracking-wide"
  >
    {label}
  </motion.button>
);

export default Navbar;