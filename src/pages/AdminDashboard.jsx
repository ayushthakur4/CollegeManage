import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaTasks,
  FaSearch,
  FaArrowUp,
  FaTimes,
  FaBell,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaskPopup, setShowTaskPopup] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTasks, setActiveTasks] = useState(42);

  // State to manage dynamic features/cards
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "Students",
      description: "Total registered students",
      icon: <FaUsers className="w-8 h-8 text-blue-600 mb-4" />,
      stats: "1,500+ Students",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      link: "/bca",
    },
    {
      id: 2,
      title: "Active Tasks",
      description: "Pending administrative tasks",
      icon: <FaTasks className="w-8 h-8 text-lime-600 mb-4" />,
      stats: `${activeTasks} Active Tasks`,
      bgColor: "bg-lime-50",
      hoverColor: "hover:bg-lime-100",
      link: "/tasks",
    },
    {
      id: 3,
      title: "Performance",
      description: "Overall improvement trend",
      icon: <FaChartLine className="w-8 h-8 text-emerald-600 mb-4" />,
      stats: "35% Improvement",
      trend: "up",
      bgColor: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      link: "/performance",
    },
      {
        id: 4,
        title: "Notices",
        description: "Add important updates too students",
        icon: <FaChartLine className="w-8 h-8 text-pink-600 mb-4" />,
        stats: "35% Improvement",
        trend: "up",
        bgColor: "bg-teal-50",
        hoverColor: "hover:bg-teal-100",
        link: "/add-notice",
      
    },
  ]);

  // Close task popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTaskPopup(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate real-time updates for active tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTasks((prev) => (prev > 0 ? prev - 1 : 0));
    }, 10000); // Decrease active tasks every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const closePopup = () => setShowTaskPopup(false);

  // Notification data
  const notifications = [
    { id: 1, message: "New notice added: Exam Schedule", time: "2 mins ago" },
    { id: 2, message: "Task completed: Attendance Report", time: "5 mins ago" },
    { id: 3, message: "5 new students registered", time: "10 mins ago" },
  ];

  return (
    
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-50 animate-blob"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply opacity-50 animate-blob animation-delay-2000"></div>

      {/* Header Section */}
      <header className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Institutional Management Console</h1>
          <p className="text-sm text-gray-600">Centralized platform for academic administration</p>
        </div>
      </header>

      {/* Search Bar and Notifications */}
      <div className="container mx-auto px-6 lg:px-20 py-6">
        <div className="flex justify-between items-center space-x-4">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, students, or reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          >
            <FaBell className="w-5 h-5" />
          </button>
          {notificationsOpen && (
            <div className="absolute top-16 right-0 w-80 bg-white rounded-lg shadow-lg p-4 space-y-2">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Popup */}
      {showTaskPopup && (
        <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg p-4 space-y-2">
          <h3 className="text-lg font-bold text-gray-800">Tasks Overview</h3>
          <p className="text-sm text-gray-600">You have {activeTasks} active tasks pending.</p>
          <button
            onClick={closePopup}
            className="text-xs text-red-500 hover:text-red-600 transition-all"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Card Filters */}
      <div className="container mx-auto px-6 lg:px-20 py-6">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all`}
          >
            All
          </button>
          <button
            onClick={() => setFilterCategory("students")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "students" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all`}
          >
            Students
          </button>
          <button
            onClick={() => setFilterCategory("tasks")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "tasks" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all`}
          >
            Tasks
          </button>
          <button
            onClick={() => setFilterCategory("performance")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filterCategory === "performance" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all`}
          >
            Performance
          </button>
        </div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="container mx-auto px-6 lg:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features
            .filter(
              (feature) =>
                filterCategory === "all" ||
                feature.title.toLowerCase() === filterCategory
            )
            .map((feature) => (
              <div
                key={feature.id}
                className={`relative ${feature.bgColor} ${feature.hoverColor} rounded-lg shadow-sm p-6 transition-all`}
              >
                <Link to={feature.link} className="block">
                  {feature.icon}
                  <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  {feature.stats && (
                    <p className="text-xl font-bold text-gray-900 mt-2">{feature.stats}</p>
                  )}
                  {feature.trend === "up" && (
                    <div className="flex items-center space-x-2 mt-2">
                      <FaArrowUp className="w-4 h-4 text-green-500" />
                      <p className="text-xl font-bold text-gray-900">35%</p>
                    </div>
                  )}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;