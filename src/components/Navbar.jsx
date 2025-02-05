import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import lg from "../assets/logo.webp";
import { FiChevronDown, FiX, FiMenu } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";

const Navbar = ({ scrollToWhatWeAre }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentCornerOpen, setIsStudentCornerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileStudentCornerOpen, setIsMobileStudentCornerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let closeTimeout;

  const handleBcaClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/student");
    } else {
      alert("Please login as STUDENT to access this page.");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[80%] z-50 ${scrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'} shadow-2xl rounded-2xl py-3 px-6 flex items-center justify-between transition-all duration-300 border border-white/20`}>
      
      {/* Logo */}
      <Link to="/" className="transition-all duration-300 hover:scale-105">
        <img src={lg} alt="Logo" className="w-18 h-6 object-contain" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        <NavLink to="/courses" label="Courses" isActive={location.pathname === "/courses"} />
        
        {/* Student Corner Dropdown */}
        <div className="relative group">
          <button
            onMouseEnter={() => {
              clearTimeout(closeTimeout);
              setIsStudentCornerOpen(true);
            }}
            onMouseLeave={() => {
              closeTimeout = setTimeout(() => {
                setIsStudentCornerOpen(false);
              }, 300); // Timeout for closing delay
            }}
            className="flex items-center space-x-2 text-slate-700 hover:text-indigo-600 transition-colors duration-300"
          >
            <RiGraduationCapLine className="text-lg" />
            <span>Student Corner</span>
            <FiChevronDown className={`transition-transform ${isStudentCornerOpen ? 'rotate-180' : ''}`} />
          </button>
          <div 
            className={`absolute top-full left-0 mt-4 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isStudentCornerOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0'}`}
            onMouseEnter={() => clearTimeout(closeTimeout)}
            onMouseLeave={() => {
              closeTimeout = setTimeout(() => {
                setIsStudentCornerOpen(false);
              }, 300);
            }}
          >
            <button onClick={handleBcaClick} className="w-full px-4 py-3 text-left text-slate-700 hover:bg-indigo-50/50 transition-colors flex items-center space-x-2">
              <NavLink to="/login" label="BCA Program" />
            </button>
          </div>
        </div>

        <NavLink to="#about" label="About Us" onClick={scrollToWhatWeAre} />
        <NavLink to="mailto:thakurayush9950@gmail.com" label="Contact Us" />
      </div>

      {/* Auth Section */}
      <div className="hidden lg:flex items-center space-x-4">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="px-4 py-2 text-slate-600 hover:bg-red-50 rounded-lg transition-colors duration-300 group">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-medium">Logout</span>
          </button>
        ) : (
          <Link to="/login" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-200/50 transition-all duration-300 flex items-center space-x-2">
            <span>Login</span>
            <div className="w-px h-4 bg-white/20" />
            <span className="font-medium">Sign Up</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 rounded-lg transition-colors">
        {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden flex justify-end">
          <div className="w-72 bg-white shadow-xl p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-xl">
              <FiX />
            </button>

            <div className="space-y-4">
              <MobileNavLink to="/courses" label="Courses" onClick={() => setIsMobileMenuOpen(false)} />
              
              <button
                onClick={() => setIsMobileStudentCornerOpen(!isMobileStudentCornerOpen)}
                className="w-full flex justify-between p-3 text-slate-700 hover:bg-indigo-50/50 rounded-lg"
              >
                <span>Student Corner</span>
                <FiChevronDown className={`transition-transform ${isMobileStudentCornerOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileStudentCornerOpen && (
                <MobileNavLink to="/login" label="BCA Program" onClick={handleBcaClick} />
              )}

              <MobileNavLink to="#about" label="About Us" onClick={scrollToWhatWeAre} />
              <MobileNavLink to="mailto:thakurayush9950@gmail.com" label="Contact Us" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Enhanced NavLink Components
const NavLink = ({ to, label, isActive, onClick }) => (
  <Link to={to} onClick={onClick} className={`px-3 py-2 text-slate-700 hover:text-indigo-600 transition-all`}>
    {label}
  </Link>
);
const MobileNavLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="block p-3 text-slate-700 hover:bg-indigo-50 rounded-lg">
    {label}
  </Link>
);

export default Navbar;
