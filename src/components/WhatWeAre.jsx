import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

// Motion Variants
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhatWeAre = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-900 overflow-hidden">
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Academic Programs" },
            { number: "15k+", label: "Alumni Network" },
            { number: "200+", label: "Faculty Members" },
            { number: "75+", label: "Acres Campus" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={slideUp}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
            >
              <div className="text-4xl font-bold text-blue-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="text-4xl font-bold text-center mb-16 text-blue-900"
          >
            Pillars of Excellence
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovative Learning", content: "State-of-the-art classrooms with interactive learning technologies", icon: "💡" },
              { title: "Research Focus", content: "50+ research centers with ₹20Cr+ annual funding", icon: "🔬" },
              { title: "Global Exposure", content: "150+ international collaborations and exchange programs", icon: "🌍" },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="text-6xl mb-6 opacity-80 group-hover:opacity-100 transition-all">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideUp}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Campus Life"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideUp}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-blue-900">Vibrant Campus Life</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience holistic development through 50+ student clubs, national-level sports facilities,
                and cultural festivals that celebrate diversity and creativity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Student Clubs", value: "50+" },
                  { label: "Sports Facilities", value: "15+" },
                  { label: "Cultural Events", value: "100+" },
                  { label: "Labs & Workshops", value: "40+" },
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-blue-900">{item.value}</div>
                    <div className="text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold">Meet the Team Behind the Code</h2>
            <p className="text-xl text-blue-200">
            Curious About the Minds Behind This? Get to Know Us!
            </p>
            <div className="flex justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all"
              >
                <Link to="/learn">Meet The Team</Link> {/* Use Link for routing */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8">
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
                    {[
                      { icon: FaTwitter, color: "text-blue-400" },
                      { icon: FaFacebookF, color: "text-blue-600" },
                      { icon: FaInstagram, color: "text-pink-500" },
                      { icon: FaYoutube, color: "text-red-600" },
                    ].map((SocialIcon, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ y: -5 }}
                        className={`${SocialIcon.color} text-2xl hover:opacity-80`}
                        href="#"
                      >
                        <SocialIcon.icon />
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
        </div>
      </section>
    </div>
  );
};

export default WhatWeAre;