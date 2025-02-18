import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileDownload, FaArrowRight, FaChevronDown } from "react-icons/fa";
import Navbar from '../components/Navbar'; // Import your custom Navbar component

// Course Data
const courses = [
  {
    category: "Graduation Programs",
    programs: [
      { 
        name: "Bachelor of Computer Applications (BCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf",
        details: "A 3-year degree program focusing on software development, database management, and computer networking."
      },
      { 
        name: "Bachelor of Science (BSc)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/5b86418e319ebB.Sc.PhysicalSciencePhyComputerscienceMaths.pdf",
        details: "A 3-year undergraduate program with specializations in Physics, Chemistry, Biology, and Computer Science."
      },
      { 
        name: "Bachelor of Arts (BA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/5b8641d2c7d89B.A.WITHCOMPUTERSCIENCE.pdf",
        details: "A broad-based 3-year degree program covering humanities, social sciences, and language studies."
      },
    ],
  },
  {
    category: "Post-Graduation Programs",
    programs: [
      { 
        name: "Master of Computer Applications (MCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6221bf5313fe7MCAIIYear.pdf",
        details: "A 2-year postgraduate program for advanced computing, AI, and software engineering."
      },
      { 
        name: "Master of Science (MSc)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6221b54ab1ea6MasterofScienceM.Sc.inDataScience.pdf",
        details: "A research-oriented master's degree in disciplines like Mathematics, Physics, and Biotechnology."
      },
      { 
        name: "Master of Arts (MA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6320619c8e29cMASyllabus20222023.pdf",
        details: "A postgraduate program covering literature, sociology, history, and political science."
      },
      { 
        name: "Post Graduate Diploma in Computer Applications (PGDCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/66eaa7654e534PGDCACBCS.pdf",
        details: "A 1-year diploma program designed for professionals aiming to enhance their computer skills."
      },
    ],
  },
];

// Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardHover = {
  hover: { scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" },
};

const Courses = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
    >
      <Navbar />

      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto text-center mb-16 pt-24 px-6 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Discover Our <span className="text-blue-400">Programs</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our wide range of undergraduate and postgraduate programs. Download the syllabus or enroll today to kickstart your journey!
        </p>
      </motion.div>

      {/* Course Categories */}
      <div className="max-w-6xl mx-auto space-y-12 px-6 relative z-10">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white bg-opacity-90 rounded-xl p-8 shadow-lg border border-gray-200 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {course.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  variants={cardHover}
                  whileHover="hover"
                  className="bg-gray-50 bg-opacity-90 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm"
                >
                  {/* Program Name & Learn More */}
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-800 mb-2">{program.name}</p>
                    <button 
                      onClick={() => setExpandedCourse(expandedCourse === idx ? null : idx)}
                      className="text-blue-600 flex items-center gap-2 hover:text-blue-800 transition"
                    >
                      Learn More <FaChevronDown className={`${expandedCourse === idx ? "rotate-180" : ""} transition-transform`} />
                    </button>
                    <AnimatePresence>
                      {expandedCourse === idx && (
                        <motion.p 
                          className="text-gray-600 mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {program.details}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mt-4">
                    <a
                      href={program.syllabus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                    >
                      <FaFileDownload /> Syllabus
                    </a>
                    <Link
                      to="/enroll"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                    >
                      <FaArrowRight /> Enroll
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;