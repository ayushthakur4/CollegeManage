import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBell, FaChartLine, FaClipboardCheck, FaBook, FaUsers, FaFileAlt, FaLaptopCode, FaServer } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { BsGearFill, BsLightningFill } from "react-icons/bs";

import NavBar from "../components/Navbar";
import AyushThakurImage from "../assets/ayushthakur.jpg";
import UjjwalBhardwajImage from "../assets/ujjuwalbhardwaj.jpg";

const LearnMore = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      } 
    },
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      } 
    },
  };

  const techStack = [
    { icon: <FaLaptopCode className="w-6 h-6" />, name: "React JS", category: "Frontend" },
    { icon: <FaServer className="w-6 h-6" />, name: "Local host", category: "Backend" },
    { icon: <BsGearFill className="w-6 h-6" />, name: "Tailwind CSS", category: "style" },
    { icon: <BsLightningFill className="w-6 h-6" />, name: "Vercel", category: "Hosting" },
  ];

  const features = [
    { icon: <FaUserGraduate className="w-8 h-8" />, title: "Online Admission", description: "Eliminated offline paper work and  Hustel." },
    { icon: <FaBell className="w-8 h-8" />, title: "Smart Notices", description: "Priority-based notification system with read receipts." },
    { icon: <FaChartLine className="w-8 h-8" />, title: "Analytics", description: "Predictive performance modeling with visualization." },
    { icon: <FaClipboardCheck className="w-8 h-8" />, title: " Attendance", description: " recognition with geofencing technology." },
    { icon: <FaBook className="w-8 h-8" />, title: "Digital Library", description: "Augmented reality course materials." },
    { icon: <FaUsers className="w-8 h-8" />, title: "Collaboration", description: "Real-time document co-authoring tools." },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-green-300 rounded-full filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      {/* Navbar */}
      <NavBar />

      {/* Hero Header */}
      <motion.header
        className="relative text-center py-24  bg-gradient-to-r from-green-600 to-green-500 text-white overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
              Student Management System
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The next-generation academic management platform
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <IoMdRocket className="mr-2 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Documentation Section */}
      <motion.section 
        className="max-w-6xl mx-auto my-20 px-6 relative z-10"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          whileHover={{ y: -5 }}
        >
          <div className="p-8 md:p-12">
            <motion.div 
              className="flex items-center mb-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <FaFileAlt className="text-green-500 text-3xl mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                Technical Documentation
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Team Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Development Team</h3>
                <div className="space-y-6">
                  <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-white rounded-xl">
                    <img src={AyushThakurImage} alt="Ayush Thakur" className="w-16 h-16 rounded-xl object-cover mr-4 border-2 border-green-200" />
                    <div>
                      <h4 className="font-bold text-lg">Ayush Thakur</h4>
                      <div className="text-green-600 text-sm font-medium mb-2">Lead Developer & Architect</div>
                      <div className="text-gray-600 text-sm">
                        <p>Roll No: 22BC005 | ID: 62209007</p>
                        <p className="mt-1">Responsible for system architecture, frontend development, Backend integration And UI/UX.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-white rounded-xl">
                    <img src={UjjwalBhardwajImage} alt="Ujjwal Bhardwaj" className="w-16 h-16 rounded-xl object-cover mr-4 border-2 border-green-200" />
                    <div>
                      <h4 className="font-bold text-lg">Ujjwal Bhardwaj</h4>
                      <div className="text-green-600 text-sm font-medium mb-2">QA Engineer & Technical Writer</div>
                      <div className="text-gray-600 text-sm">
                        <p>Roll No: 22BC003 | ID: 6220090037</p>
                        <p className="mt-1">Responsible for testing protocols, security, and system documentation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Technology Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-green-100 rounded-lg mr-3 text-green-600">
                          {tech.icon}
                        </div>
                        <span className="font-medium">{tech.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{tech.category}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-6 pb-2 border-b border-gray-200">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 border-b border-gray-100">
                    <span className="text-gray-600">Project Duration</span>
                    <span className="font-medium">3 Months</span>
                  </div>
                  <div className="flex justify-between p-3 border-b border-gray-100">
                    <span className="text-gray-600">Development Hours</span>
                    <span className="font-medium">500+ Hours</span>
                  </div>
                  <div className="flex justify-between p-3 border-b border-gray-100">
                    <span className="text-gray-600">Code Commits</span>
                    <span className="font-medium">247</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="max-w-6xl mx-auto my-20 px-6 relative z-10"
        variants={itemVariants}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
              Cutting-Edge
            </span> Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Designed to revolutionize campus management with modern technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-green-600 font-medium">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Spotlight */}
      <motion.section 
        className="max-w-6xl mx-auto my-20 px-6 relative z-10"
        variants={itemVariants}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
              The Team
            </span> Behind the Project
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the developers who brought this vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ayush Thakur */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-500 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full filter blur-xl"></div>
            </div>
            <div className="p-6 relative">
              <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl border-4 border-white overflow-hidden shadow-lg">
                <img src={AyushThakurImage} alt="Ayush Thakur" className="w-full h-full object-cover" />
              </div>
              <div className="mt-16">
                <h3 className="text-2xl font-bold">Ayush Thakur</h3>
                <div className="text-green-600 font-medium mb-4">Lead Developer</div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="mr-4">Roll No: 22BC005</span>
                  <span>ID: 62209007</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Designed the core architecture and implemented,Responsible for system architecture, frontend development, Backend integration And UI/UX. .
                </p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Node.js</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ujjwal Bhardwaj */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-500 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full filter blur-xl"></div>
            </div>
            <div className="p-6 relative">
              <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl border-4 border-white overflow-hidden shadow-lg">
                <img src={UjjwalBhardwajImage} alt="Ujjwal Bhardwaj" className="w-full h-full object-cover" />
              </div>
              <div className="mt-16">
                <h3 className="text-2xl font-bold">Ujjwal Bhardwaj</h3>
                <div className="text-green-600 font-medium mb-4">QA & Documentation</div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="mr-4">Roll No: 22BC003</span>
                  <span>ID: 6220090037</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Implemented rigorous testing protocols and created comprehensive documentation for the platform.
                </p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Testing</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Security</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Docs</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mentor */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-50 to-white rounded-2xl p-8 border border-green-200 max-w-2xl mx-auto text-center shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-700 text-lg">
            Guided by <span className="font-bold text-green-600">Prof. Jyoti Modgil</span>, 
            BCA 6th Project In-Charge
          </p>
        </motion.div>
      </motion.section>

     
    </motion.div>
  );
};

export default LearnMore;