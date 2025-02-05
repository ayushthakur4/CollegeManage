import React, { useState } from "react";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaMicrochip,
  FaBook,
  FaDownload,
} from "react-icons/fa";
import easyImage from "../assets/easy.png";
import mediumImage from "../assets/medium.png";
import hardImage from "../assets/hard.png";
import Navbar from "../components/Navbar";

const Courses = () => {
  const [expanded, setExpanded] = useState(null);

  const courses = [
    {
      title: "PGDCA",
      shortDescription: "A one-year diploma in computer applications.",
      fullDescription:
        "An intensive one-year program equipping students with advanced computer application skills, including programming, networking, and database management.",
      image: easyImage,
      link: "https://hpuniv.ac.in/upload/syllabus/66eaa7654e534PGDCACBCS.pdf",
      icon: <FaGraduationCap className="text-teal-600 text-4xl" />,
      difficulty: "Beginner",
      skills: ["Programming", "Networking", "Database"],
    },
    {
      title: "BCA",
      shortDescription: "A three-year undergraduate program in IT.",
      fullDescription:
        "A dynamic three-year undergraduate program focusing on software development, networking, cybersecurity, and more, preparing students for the IT industry.",
      image: mediumImage,
      link: "https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf",
      icon: <FaLaptopCode className="text-indigo-600 text-4xl" />,
      difficulty: "Intermediate",
      skills: ["Software Development", "Cybersecurity", "Web Design"],
    },
    {
      title: "MCA",
      shortDescription: "A two-year master’s program in computing.",
      fullDescription:
        "A comprehensive two-year postgraduate program designed to create tech leaders with expertise in AI, data science, and software engineering.",
      image: hardImage,
      link: "https://hpuniv.ac.in/upload/syllabus/60c1bcfc6094fmca2yr.pdf",
      icon: <FaMicrochip className="text-pink-600 text-4xl" />,
      difficulty: "Advanced",
      skills: ["AI", "Data Science", "Cloud Computing"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-24 mt-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold mb-12 text-gray-800 drop-shadow-lg">
            Explore Our Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col"
              >
                {/* Image Section */}
                <figure className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                </figure>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-center space-x-4">
                    {course.icon}
                    <h2 className="text-2xl font-bold text-gray-800">
                      {course.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-base">
                    {expanded === index
                      ? course.fullDescription
                      : course.shortDescription}
                  </p>

                  {/* Difficulty Badge */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        course.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() =>
                        setExpanded(expanded === index ? null : index)
                      }
                      className="text-teal-600 font-semibold hover:underline transition-colors duration-300"
                    >
                      {expanded === index ? "Show Less" : "Learn More"}
                    </button>
                    <a
                      href={course.link}
                      className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-teal-700 transition duration-300"
                    >
                      <FaDownload /> <span>Download Syllabus</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;