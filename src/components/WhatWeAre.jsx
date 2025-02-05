import React from "react";
import { FaStar, FaRegStar, FaLaptop, FaUsers, FaChalkboardTeacher, FaTrophy, FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Motion variants for scroll animations
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 1, ease: "easeOut" } },
};

const WhatWeAre = () => {
  const reviews = [
    {
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Hardik Pandya",
      role: "Alumni",
      rating: 5,
      text: "The advanced labs and faculty at GDC BARSAR transformed my career.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Khushi Dutt",
      role: "Current Student",
      rating: 4,
      text: "The seminars here are unparalleled, bringing top industry experts.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Aarav Singh",
      role: "Alumni",
      rating: 5,
      text: "The mentorship helped me secure a top-tier job in the tech industry.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-50 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mission & Vision Section with Scrolling Animation */}
      <motion.section
        className="relative py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8 relative">
              <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-teal-400 rounded-full"></div>
              <motion.h2
                className="text-4xl font-bold text-gray-800 leading-tight"
                initial="hidden"
                whileInView="visible"
                variants={slideInLeft}
              >
                Shaping Futures Through
                <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}Innovative Education
                </span>
              </motion.h2>
              <div className="space-y-6">
                <div className="pl-8 border-l-4 border-indigo-200">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To empower students with knowledge, skills, and values that prepare them to excel in their chosen fields and contribute meaningfully to society.
                  </p>
                </div>
                <div className="pl-8 border-l-4 border-teal-200">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To become a global leader in education by fostering innovation, creativity, and excellence in all aspects of learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl"
                initial="hidden"
                whileInView="visible"
                variants={rotateIn}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-teal-500"></div>
                <div className="absolute inset-6 border-2 border-white/30 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-white text-center px-8">
                    "Education is the most powerful weapon which you can use to change the world"
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section with Animation */}
      <motion.section
        className="relative py-24 bg-white/50 backdrop-blur-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleUp}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose
            <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent"> GDC BARSAR</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: FaLaptop, title: "Advanced Labs", text: "State-of-the-art facilities with hands-on experience in real-world scenarios." },
              { icon: FaUsers, title: "Expert Seminars", text: "Industry-led workshops bringing the latest tech trends to our students." },
              { icon: FaChalkboardTeacher, title: "Distinguished Faculty", text: "Experienced mentors guiding your academic and professional journey." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                variants={slideInLeft}
              >
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-100 transition-colors duration-300"></div>
                <feature.icon className="w-16 h-16 p-4 mb-6 text-indigo-600 bg-indigo-50 rounded-2xl" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements Section with Animation */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-indigo-50 to-teal-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: FaTrophy, title: "Ranked #1", subtitle: "Best Computer Science College in the Region" },
              { icon: FaGraduationCap, title: "5000+ Alumni", subtitle: "Successful graduates worldwide" },
              { icon: FaUsers, title: "100+ Partners", subtitle: "Industry collaborations and placements" },
            ].map((achievement, idx) => (
              <motion.div
                key={idx}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                whileInView="visible"
                variants={scaleUp}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-indigo-600 text-white rounded-2xl">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section with Animation */}
      <motion.section
        className="relative py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Voices of
            <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent"> Success</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                whileInView="visible"
                variants={slideInRight}
              >
                <div className="absolute top-0 right-0 p-4 text-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity">
                  <FaStar className="w-8 h-8" />
                </div>
                <div className="flex items-center mb-6">
                  <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="mr-1">
                      {i < review.rating ? (
                        <FaStar className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <FaRegStar className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-indigo-600 to-teal-600"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Begin Your
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-lg text-indigo-100 mb-12">
              Take the first step towards a brighter future with GDC BARSAR. Enroll now and join a community of innovators and leaders.
            </p>
            <Link
              to="/enroll"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>
    
      {/* Contact Section */}
      <motion.section
        className="relative py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900">Contact Us</h2>
              <p className="text-gray-600">
                Have questions? Our team is here to help guide your academic journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaMapMarkerAlt className="text-blue-900 text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Main Campus</div>
                    <div className="text-gray-600">Summer Hill, Shimla - 171005</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaPhone className="text-blue-900 text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Admission Helpline</div>
                    <div className="text-gray-600">+91 177 283 3555</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaEnvelope className="text-blue-900 text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">admissions@hpuniv.ac.in</div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube].map((Icon, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -5 }}
                      className="text-blue-400 text-2xl hover:opacity-80"
                      href="#"
                    >
                      <Icon className="w-8 h-8" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WhatWeAre;
