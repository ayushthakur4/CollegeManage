import React from "react";
import { motion } from "framer-motion";

import NavBar from "../components/Navbar";
import AyushThakurImage from "../assets/ayushthakur.jpg";
import UjjwalBhardwajImage from "../assets/ujjuwalbhardwaj.jpg";
import AnchalKumariImage from "../assets/anchalkumari.jpg";

// Import icons (you can use any icon library like react-icons or custom SVGs)
import { FaUserGraduate, FaBell, FaChartLine, FaClipboardCheck, FaBook, FaUsers } from "react-icons/fa";

const LearnMore = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Function to highlight the first word
  const highlightFirstWord = (text, color) => {
    const words = text.split(" ");
    return (
      <p className="text-gray-600 mb-4">
        <span style={{ color, fontSize: "1.25rem", fontWeight: "bold" }}>{words[0]}</span> {words.slice(1).join(" ")}
      </p>
    );
  };

  // Key Features Data
  const features = [
    {
      icon: <FaUserGraduate className="w-12 h-12 text-blue-600" />,
      title: "Online Admission",
      description: "Streamline the admission process with an easy-to-use online platform for students to apply and track their application status.",
    },
    {
      icon: <FaBell className="w-12 h-12 text-purple-600" />,
      title: "Notice Board",
      description: "Stay updated with important announcements, events, and deadlines through a centralized notice board.",
    },
    {
      icon: <FaChartLine className="w-12 h-12 text-green-600" />,
      title: "Result & Performance Tracking",
      description: "Students can view their results and track their academic performance over time with detailed analytics.",
    },
    {
      icon: <FaClipboardCheck className="w-12 h-12 text-yellow-600" />,
      title: "Attendance Management",
      description: "Teachers can easily manage and record attendance, while students can monitor their attendance records.",
    },
    {
      icon: <FaBook className="w-12 h-12 text-indigo-600" />,
      title: "Course & Syllabus Access",
      description: "Access course materials, syllabus, and academic resources all in one place for seamless learning.",
    },
    {
      icon: <FaUsers className="w-12 h-12 text-pink-600" />,
      title: "User-Friendly Interface",
      description: "Designed with simplicity in mind, the platform ensures a smooth experience for both students and teachers.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 font-sans overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navbar */}
      <NavBar />

      {/* Header Section */}
      <motion.header
        className="text-center py-32 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1496469888073-80de7e952517?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div> {/* Overlay for better text visibility */}
        <div className="relative z-10">
          <motion.h1
            className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            College Student Management System
          </motion.h1>
          <motion.p
            className=" font-bold text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto "
            whileHover={{ scale: 1.02 }}
          >
            Revolutionizing academic and administrative processes with a seamless, intuitive platform for students and teachers.
          </motion.p>
        </div>
      </motion.header>

      {/* Project Details Section */}
      <motion.section
        className="max-w-7xl mx-auto bg-white/50 backdrop-blur-lg p-12 rounded-[40px] shadow-2xl mb-20 relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About the Project</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The College Student Management System is a cutting-edge platform designed to simplify and enhance the academic and administrative experience for both students and teachers. It provides a centralized hub for managing admissions, attendance, results, and academic resources.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Students can easily apply for admissions, view notices, check their results, and track their academic progress. Teachers, on the other hand, can manage attendance, upload notices, and evaluate student performance with just a few clicks.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The system is built with a user-friendly interface, ensuring that even non-tech-savvy users can navigate it effortlessly. It also includes features like course details, syllabus access, and performance analytics to provide a comprehensive academic experience.
        </p>
      </motion.section>

      {/* Team Details Section */}
      <motion.section
        className="max-w-7xl mx-auto mb-20"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Ayush Thakur */}
          <motion.div
            className="bg-white/50 backdrop-blur-lg p-8 rounded-[30px] shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200">
              <img src={AyushThakurImage} alt="Ayush Thakur" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ayush Thakur</h3>
            {highlightFirstWord(
              "Developer and designer of this project. Responsible for coding, designing, and bringing the idea to life.",
              "red"
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-gray-700">Class Roll No: 22BC005</p>
              <p className="text-gray-700">University Roll No: 62209007</p>
            </div>
          </motion.div>

          {/* Ujjwal Bhardwaj */}
          <motion.div
            className="bg-white/50 backdrop-blur-lg p-8 rounded-[30px] shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-200">
              <img src={UjjwalBhardwajImage} alt="Ujjwal Bhardwaj" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ujjwal Bhardwaj</h3>
            {highlightFirstWord(
              "Ensured user-friendliness and bug-free functionality. Played a crucial role in documentation and testing.",
              "green"
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-gray-700">Class Roll No: 22BC003</p>
              <p className="text-gray-700">University Roll No: 6220090037</p>
            </div>
          </motion.div>

          {/* Anchal Kumari */}
          <motion.div
            className="bg-white/50 backdrop-blur-lg p-8 rounded-[30px] shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-200">
              <img src={AnchalKumariImage} alt="Anchal Kumari" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Anchal Kumari</h3>
            {highlightFirstWord(
              "Contributed valuable insights during brainstorming and supported the team with organizational skills.",
              "orange"
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-gray-700">Class Roll No: 22BC005</p>
              <p className="text-gray-700">University Roll No: 6220090001</p>
            </div>
          </motion.div>
        </div>

        {/* Guidance Card */}
        <motion.div
          className="max-w-7xl mx-auto bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-md mt-10 text-center"
          variants={itemVariants}
        >
          <p className="text-xl text-gray-800 font-semibold">
            This project is made under the guidance of{" "}
            <span className="text-blue-700 font-bold">Prof. Jyoti Modgil</span>, Professor of BCA 6th, our project in-charge.
          </p>
        </motion.div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="max-w-7xl mx-auto bg-white/50 backdrop-blur-lg p-12 rounded-[40px] shadow-2xl mb-20 relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-lg p-8 rounded-[20px] shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-opacity-10 bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl -z-10"></div>
              <div className="text-center">
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        className="text-center text-gray-600 py-10"
        variants={itemVariants}
      >
        <p>Thank you for visiting our project page! We hope you find our College Student Management System useful and innovative.</p>
      </motion.footer>
    </motion.div>
  );
};

export default LearnMore;