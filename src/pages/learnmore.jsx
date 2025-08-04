// ... (all imports remain same)
import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBell, FaChartLine, FaClipboardCheck, FaBook, FaUsers, FaFileAlt, FaLaptopCode, FaServer } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import { BsGearFill, BsLightningFill } from "react-icons/bs";

import NavBar from "../components/Navbar";
import AyushThakurImage from "../assets/ayushthakur.jpg";
const LearnMore = () => {
  // ... (variants, techStack, features unchanged)

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      {/* Navbar */}
      <NavBar />

      {/* Hero Header */}
      {/* ...unchanged */}

      {/* Documentation Section */}
      <motion.section className="max-w-6xl mx-auto my-20 px-6 relative z-10" variants={itemVariants}>
        <motion.div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200" whileHover={{ y: -5 }}>
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
      {/* ...unchanged */}

      {/* Team Spotlight */}
      <motion.section className="max-w-6xl mx-auto my-20 px-6 relative z-10" variants={itemVariants}>
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
            Meet the developer who brought this vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Only Ayush Thakur */}
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
                  Designed the core architecture and implemented, Responsible for system architecture, frontend development, Backend integration and UI/UX.
                </p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Node.js</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LearnMore;
