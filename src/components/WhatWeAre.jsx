import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube,
  FaUserGraduate,
  FaChartLine,
  FaClipboardCheck
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    } 
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    } 
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WhatWeAre = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "95%", label: "Attendance Accuracy", icon: <FaClipboardCheck className="w-8 h-8" /> },
              { number: "10k+", label: "Students Tracked", icon: <FaUserGraduate className="w-8 h-8" /> },
              { number: "500+", label: "Performance Reports", icon: <FaChartLine className="w-8 h-8" /> },
              { number: "24/7", label: "Real-Time Monitoring", icon: <IoMdRocket className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="text-green-600 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-800 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                About This App
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing education management with cutting-edge technology
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Attendance Tracking",
                content: "AI-powered facial recognition with geofencing technology for precise attendance monitoring.",
                icon: <FaClipboardCheck className="w-10 h-10" />
              },
              {
                title: "Performance Insights",
                content: "Predictive analytics and personalized learning recommendations for student success.",
                icon: <FaChartLine className="w-10 h-10" />
              },
              {
                title: "Result Management",
                content: "Blockchain-secured academic records with instant verification capabilities.",
                icon: <FaUserGraduate className="w-10 h-10" />
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-green-100"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-800">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-20 relative z-10 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Campus Life"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold text-green-800"
              >
                Student Success Stories
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                Discover how our platform has transformed academic management and student outcomes across institutions.
              </motion.p>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Improved Attendance", value: "95%", color: "from-green-400 to-green-300" },
                  { label: "Better Grades", value: "80%", color: "from-green-500 to-green-400" },
                  { label: "Happy Students", value: "10k+", color: "from-green-600 to-green-500" },
                  { label: "Active Users", value: "500+", color: "from-green-700 to-green-600" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={slideUp}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="py-20 relative z-10 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="space-y-8 max-w-4xl mx-auto relative z-10"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-4xl font-bold"
            >
              Ready to Transform Education?
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-green-200"
            >
              Join thousands of institutions revolutionizing their academic management.
            </motion.p>
            <motion.div variants={scaleUp}>
              <Link to="/enroll">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-800 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                >
                  Apply Now
                  <IoMdRocket className="text-lg animate-pulse" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                <motion.h2 
                  variants={fadeIn}
                  className="text-3xl font-bold text-green-800"
                >
                  Contact Us
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-gray-600"
                >
                  Our team is here to help guide your digital transformation journey.
                </motion.p>
                <motion.div 
                  variants={containerVariants}
                  className="space-y-6"
                >
                  <motion.div 
                    variants={slideUp}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Main Campus</div>
                      <div className="text-gray-600 text-sm">
                        Summer Hill, Shimla - 171005
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={slideUp}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      <FaPhone className="text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Admission Helpline</div>
                      <div className="text-gray-600 text-sm">
                        +91 177 283 3555
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={slideUp}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600 text-sm">
                        admissions@hpuniv.ac.in
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div 
                  variants={fadeIn}
                  className="pt-4"
                >
                  <h3 className="text-sm font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: FaTwitter, color: "text-blue-400 hover:text-blue-500" },
                      { icon: FaFacebookF, color: "text-blue-600 hover:text-blue-700" },
                      { icon: FaInstagram, color: "text-pink-500 hover:text-pink-600" },
                      { icon: FaYoutube, color: "text-red-600 hover:text-red-700" },
                    ].map((SocialIcon, index) => (
                      <motion.a
                        key={index}
                        variants={slideUp}
                        whileHover={{ y: -3 }}
                        className={`${SocialIcon.color} text-xl transition-colors p-3 bg-white rounded-full shadow-sm hover:shadow-md`}
                        href="#"
                      >
                        <SocialIcon.icon />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scaleUp}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <form className="space-y-6">
                  <motion.div variants={fadeIn}>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  </motion.div>
                  <motion.div variants={scaleUp}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-md"
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeAre;