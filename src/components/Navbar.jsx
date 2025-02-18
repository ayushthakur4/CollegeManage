import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiX, FiMenu, FiBell } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaFileDownload } from "react-icons/fa";
import lg from "../assets/logo.webp";

const Navbar = ({ scrollToWhatWeAre }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentCornerOpen, setIsStudentCornerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false);
  const navbarRef = useRef(null);
  const studentCornerTimeout = useRef(null);

  useEffect(() => {
    const savedNotices = localStorage.getItem("notices");
    setNotices(savedNotices ? JSON.parse(savedNotices) : []);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
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
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleStudentCornerEnter = () => {
    clearTimeout(studentCornerTimeout.current);
    setIsStudentCornerOpen(true);
  };

  const handleStudentCornerLeave = () => {
    studentCornerTimeout.current = setTimeout(() => {
      setIsStudentCornerOpen(false);
    }, 200);
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out rounded-full shadow-lg flex items-center justify-center backdrop-blur-md
        ${scrolled ? "bg-black/90" : "bg-black/80"}
        text-white
        ${isExpanded ? "w-11/12 lg:w-3/4 p-4" : "w-40 h-16"}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        <div className="w-full h-full flex items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105 flex items-center"
          >
            <img src={lg} alt="Logo" className="w-32 h-8 object-contain mr-2" />
          </Link>
          {/* Navigation (Horizontal, Right-Aligned) */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <NavLink
              to="/courses"
              label="Courses"
              isActive={location.pathname === "/courses"}
            />
            {/* Student Corner Dropdown */}
            <div
              className="relative group"
              onMouseEnter={handleStudentCornerEnter}
              onMouseLeave={handleStudentCornerLeave}
            >
              <button className="flex items-center space-x-2 font-semibold hover:text-gray-300 transition-colors duration-300">
                <RiGraduationCapLine className="text-lg" />
                <span>Student</span>
                <FiChevronDown
                  className={`transition-transform ${isStudentCornerOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isStudentCornerOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
              >
                <button
                  onClick={handleBcaClick}
                  className="w-full px-4 py-3 text-left font-semibold hover:bg-indigo-600/30 transition-colors flex items-center space-x-2"
                >
                  <span>BCA Program</span>
                </button>
              </div>
            </div>
            <NavLink
              to="/learn"
              label="About"
              onClick={scrollToWhatWeAre}
            />
            <NavLink
              to="mailto:thakurayush9950@gmail.com"
              label="Contact"
            />
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNoticeBoxVisible(!isNoticeBoxVisible)}
                className="p-2 bg-black/50 backdrop-blur-lg rounded-full cursor-pointer hover:bg-black/70 transition-colors duration-300"
              >
                <FiBell className="text-xl text-gray-200" />
              </button>
              {/* Notices Box */}
              {isNoticeBoxVisible && (
                <div className="absolute top-12 right-0 w-80 bg-black/50 backdrop-blur-lg rounded-lg shadow-lg p-4">
                  <h2 className="text-xl font-semibold text-gray-100 mb-3">Latest Notices</h2>
                  {notices.length === 0 ? (
                    <div className="text-center text-gray-400">No notices published yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {notices.map((notice, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-black/30 p-3 rounded-lg hover:bg-black/40 transition duration-300"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-sm">{notice.title}</h3>
                            <p className="text-xs text-gray-300">{notice.fileName} - {notice.date}</p>
                          </div>
                          <a
                            href={notice.file}
                            download
                            className="p-2 text-gray-400 hover:text-emerald-400"
                            title="Download PDF"
                          >
                            <FaFileDownload size={18} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {localStorage.getItem("isLoggedIn") ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 font-semibold bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300 text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Login/Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 font-bold hover:text-gray-300 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      ) : (
        // Collapsed State: Just Logo
        <Link
          to="/"
          className="transition-transform duration-300 hover:scale-105 flex items-center justify-center"
        >
          <img src={lg} alt="Logo" className="w-24 h-12 object-contain" />
        </Link>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          {/* Menu Content */}
          <div className="fixed top-0 right-0 h-screen w-full lg:w-72 bg-gray-900 p-6 z-50 shadow-xl">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-3xl font-bold hover:text-gray-300 transition-colors"
            >
              <FiX />
            </button>
            <div className="space-y-4 mt-4">
              <MobileNavLink
                to="/courses"
                label="Courses"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <button
                onClick={() => setIsStudentCornerOpen(!isStudentCornerOpen)}
                className="w-full flex justify-between p-3 font-semibold hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span>Student Corner</span>
                <FiChevronDown
                  className={`transition-transform ${isStudentCornerOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isStudentCornerOpen && (
                <MobileNavLink
                  to="/login"
                  label="BCA Program"
                  onClick={handleBcaClick}
                />
              )}
              <MobileNavLink
                to="/learn"
                label="About Us"
                onClick={scrollToWhatWeAre}
              />
              <MobileNavLink
                to="mailto:thakurayush9950@gmail.com"
                label="Contact Us"
              />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

const NavLink = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-2 py-1 font-semibold hover:text-gray-300 transition-all duration-300 text-sm ${isActive ? "underline decoration-indigo-500" : ""
      }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block p-3 font-semibold hover:bg-gray-700 rounded-lg transition-colors"
  >
    {label}
  </Link>
);

export default Navbar;