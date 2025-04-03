import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileDownload, FaArrowRight, FaChevronDown, FaUniversity, FaGraduationCap, FaBookOpen } from "react-icons/fa";
import Navbar from '../components/Navbar';

// Course Data
const courses = [
  {
    category: "Graduation Programs",
    icon: <FaGraduationCap className="text-blue-400 text-2xl" />,
    programs: [
      { 
        name: "Bachelor of Computer Applications (BCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf",
        details: "A 3-year degree program focusing on software development, database management, and computer networking.",
        highlights: ["Industry-relevant curriculum", "Practical lab sessions", "Placement assistance"]
      },
      { 
        name: "Bachelor of Science (BSc)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/5b86418e319ebB.Sc.PhysicalSciencePhyComputerscienceMaths.pdf",
        details: "A 3-year undergraduate program with specializations in Physics, Chemistry, Biology, and Computer Science.",
        highlights: ["Research-oriented approach", "Modern laboratory facilities", "Interdisciplinary learning"]
      },
      { 
        name: "Bachelor of Arts (BA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/5b8641d2c7d89B.A.WITHCOMPUTERSCIENCE.pdf",
        details: "A broad-based 3-year degree program covering humanities, social sciences, and language studies.",
        highlights: ["Diverse subject options", "Critical thinking focus", "Cultural studies"]
      },
    ],
  },
  {
    category: "Post-Graduation Programs",
    icon: <FaUniversity className="text-purple-400 text-2xl" />,
    programs: [
      { 
        name: "Master of Computer Applications (MCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6221bf5313fe7MCAIIYear.pdf",
        details: "A 2-year postgraduate program for advanced computing, AI, and software engineering.",
        highlights: ["Advanced programming", "AI/ML specialization", "Industry projects"]
      },
      { 
        name: "Master of Science (MSc)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6221b54ab1ea6MasterofScienceM.Sc.inDataScience.pdf",
        details: "A research-oriented master's degree in disciplines like Mathematics, Physics, and Biotechnology.",
        highlights: ["Thesis option", "Specialized tracks", "Faculty mentorship"]
      },
      { 
        name: "Master of Arts (MA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/6320619c8e29cMASyllabus20222023.pdf",
        details: "A postgraduate program covering literature, sociology, history, and political science.",
        highlights: ["Seminar-based learning", "Field research", "Publication opportunities"]
      },
      { 
        name: "Post Graduate Diploma in Computer Applications (PGDCA)", 
        syllabus: "https://hpuniv.ac.in/upload/syllabus/66eaa7654e534PGDCACBCS.pdf",
        details: "A 1-year diploma program designed for professionals aiming to enhance their computer skills.",
        highlights: ["Short duration", "Practical focus", "Career advancement"]
      },
    ],
  },
];

// Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1,
      when: "beforeChildren"
    } 
  },
};

const cardHover = {
  hover: { 
    scale: 1.02, 
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    y: -5,
    transition: { duration: 0.3 }
  },
};

const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Courses = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto text-center mb-16 pt-32 px-6 relative z-10"
      >
        <motion.div 
          className="inline-block mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaBookOpen className="text-blue-400 text-5xl mx-auto" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Academic Programs
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover our comprehensive range of undergraduate and postgraduate programs designed to shape future leaders and innovators.
        </p>
      </motion.div>

      {/* Course Categories */}
      <div className="max-w-6xl mx-auto space-y-12 px-6 pb-20 relative z-10">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl border border-gray-200 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              {course.icon}
              <h2 className="text-3xl font-bold text-gray-800">
                {course.category}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  variants={cardHover}
                  whileHover="hover"
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="text-left">
                    <p className="text-xl font-bold text-gray-800 mb-2">{program.name}</p>
                    <button 
                      onClick={() => setExpandedCourse(expandedCourse === `${index}-${idx}` ? null : `${index}-${idx}`)}
                      className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800 transition mb-3"
                    >
                      Program Details 
                      <FaChevronDown className={`${expandedCourse === `${index}-${idx}` ? "rotate-180" : ""} transition-transform`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedCourse === `${index}-${idx}` && (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-gray-600 mb-4">{program.details}</p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Key Highlights:</h4>
                            <ul className="space-y-2">
                              {program.highlights.map((highlight, i) => (
                                <motion.li 
                                  key={i}
                                  variants={listItem}
                                  className="flex items-start gap-2 text-gray-600"
                                >
                                  <span className="text-blue-400 mt-1">•</span> {highlight}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <motion.a
                      href={program.syllabus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition flex-1 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFileDownload /> Syllabus
                    </motion.a>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Link
                        to="/enroll"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition w-full justify-center"
                      >
                        <FaArrowRight /> Enroll Now
                      </Link>
                    </motion.div>
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