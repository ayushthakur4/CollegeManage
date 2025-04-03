import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaSearch, FaUser, FaUpload, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Receipt from "../components/Receipt";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    course: "BCA",
    studentType: "new",
    feeType: "subsidized",
    rollNumber: "",
    semester: "Semester 1",
    image: null,
    paymentMethod: "at-college",
  });

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const courses = ["BCA", "MCA", "MSC", "BSC"];
  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];
  const studentTypes = ["New Student", "Existing Student"];
  const feeTypes = ["Subsidized", "Non-Subsidized"];
  const paymentMethods = ["UPI", "At College", "Card"];

  const feeStructure = {
    BCA: { subsidized: 7650, nonSubsidized: 16780 },
    MCA: { subsidized: 12000, nonSubsidized: 25000 },
    MSC: { subsidized: 10000, nonSubsidized: 20000 },
    BSC: { subsidized: 8000, nonSubsidized: 18000 },
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits";
      case "rollNumber":
        return value.trim() !== "" ? "" : "Roll number is required";
      case "dob":
        return value.trim() !== "" ? "" : "Date of birth is required";
      case "address":
        return value.trim() !== "" ? "" : "Address is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });

    if (name === "studentType") {
      setShowSearchBar(value === "existing");
    }
  };

  const handleSearch = () => {
    const student = Object.values(students)
      .flat()
      .find((student) => student.rollNumber === searchQuery);

    if (student) {
      setFormData({
        ...formData,
        name: student.name,
        rollNumber: student.rollNumber,
        semester: student.semester,
        studentType: "existing",
      });
      setErrors({});
    } else {
      setErrors({ rollNumber: "No student found with this roll number" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    alert("Admission Form Submitted Successfully!");
    console.log("Form Data:", formData);
  };

  const calculateFee = () => {
    const course = formData.course;
    const feeType = formData.feeType === "subsidized" ? "subsidized" : "nonSubsidized";
    return feeStructure[course][feeType];
  };

  const progress = (step / 3) * 100;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-16">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Step {step} of 3
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
            Admission Form
          </h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-green-700">Step 1: Personal Details</h2>

                  {/* Student Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Type
                    </label>
                    <select
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {studentTypes.map((type) => (
                        <option key={type} value={type.toLowerCase().replace(" ", "-")}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Bar for Existing Students */}
                  {showSearchBar && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Enter Roll Number
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter roll number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                          />
                          <button
                            type="button"
                            onClick={handleSearch}
                            className="mt-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                          >
                            <FaSearch />
                          </button>
                        </div>
                        {errors.rollNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Roll Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="Enter your roll number"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {semesters.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Profile Picture
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                      <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                        <FaUpload className="inline-block mr-2" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Course & Fee Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-green-700">Step 2: Course & Fee Details</h2>

                  {/* Course Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fee Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fee Type
                    </label>
                    <select
                      name="feeType"
                      value={formData.feeType}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {feeTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fee Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fee Amount
                    </label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      ₹ {calculateFee().toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment Details */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-green-700">Step 3: Payment Details</h2>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {paymentMethods.map((method) => (
                        <option key={method} value={method.toLowerCase().replace(" ", "-")}>
                          {method}
                        </option>
                      ))}
                    </select>
                    {formData.paymentMethod !== "at-college" && (
                      <p className="text-red-500 text-sm mt-2">
                        This payment method is not available. Please pay at the college.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Admission Successful!</h2>
              <Receipt formData={formData} photoPreview={photoPreview} />
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdmissionForm;