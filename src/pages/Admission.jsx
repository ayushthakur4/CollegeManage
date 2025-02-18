import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Receipt from "../components/Receipt";
import { motion } from "framer-motion";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle, FaCreditCard, FaUniversity, FaFileImage } from "react-icons/fa"; // Import icons
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: null,  
    course: "",
    semester: "",
    feeType: "",
    rollNumber: "",
    idPhoto: null,
    paymentMethod: "",
    agree: false,
  });
  const [upiUnavailable, setUpiUnavailable] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newErrors = { ...errors }; // Copy existing errors

    if (name === "name" && !/^[a-zA-Z\s]+$/.test(value)) {
      newErrors.name = "Name should only contain letters and spaces.";
    } else {
      delete newErrors.name; // Clear error if valid
    }

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Invalid email format.";
    } else {
      delete newErrors.email;
    }
    if (name === "phone" && !/^[0-9]+$/.test(value)) {
      newErrors.phone = "Invalid phone number format.";
    } else {
      delete newErrors.phone;
    }

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG, GIF).");
        return;
      }
      setPhotoPreview(URL.createObjectURL(file));
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
    setErrors(newErrors); // Update error state
    if (name === "paymentMethod") {
      if (value === "UPI") {
        setUpiUnavailable(true);
      } else {
        setUpiUnavailable(false);
      }
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.course) newErrors.course = "Course is required.";
    if (!formData.semester) newErrors.semester = "Semester is required.";
    if (!formData.feeType) newErrors.feeType = "Fee Type is required.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
    if (!formData.rollNumber) newErrors.rollNumber = "Roll Number is required.";
    if (!formData.idPhoto) newErrors.idPhoto = "ID Photo is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if there are errors
    }

    console.log("Form Submitted", formData);
    alert("Form Submitted Successfully!");
    setShowReceipt(true);
    setFormSubmitted(true);
  };

  const getSemesterOptions = () => {
    let options = [];
    if (formData.course === "BCA" || formData.course === "BSc" || formData.course === "BA") {
      options = Array.from({ length: 6 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          Semester {i + 1}
        </option>
      ));
    } else if (formData.course === "MCA" || formData.course === "MSc" || formData.course === "MA" || formData.course === "PGDCA") {
      options = Array.from({ length: 4 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          Semester {i + 1}
        </option>
      ));
    } else {
      return <option disabled>Select course first</option>;
    }
    return options;
  };

  const getFeeAmount = () => {
    let amount = 0;
    if (formData.course === "BCA" || formData.course === "BSc" || formData.course === "BA") {
      amount = formData.feeType === "Subsidized" ? 7650 : 14800;
    } else if (formData.course === "MCA" || formData.course === "MSc" || formData.course === "MA" || formData.course === "PGDCA") {
      amount = formData.feeType === "Subsidized" ? 25000 : 50000;
    }
    return amount;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      let newErrors = { ...errors };
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.phone) newErrors.phone = "Phone is required.";
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    } else if (currentStep === 2) {
      let newErrors = { ...errors };
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.dob) newErrors.dob = "Date of Birth is required.";
      if (!formData.course) newErrors.course = "Course is required.";
      if (!formData.semester) newErrors.semester = "Semester is required.";
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    } else if (currentStep === 3) {
      let newErrors = { ...errors };
      if (!formData.feeType) newErrors.feeType = "Fee Type is required.";
      if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  }
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-3xl overflow-hidden"
        >
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              College Admission Form
            </h1>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FaInfoCircle className="mr-2 text-blue-500" /> Basic Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address & Course Selection */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FaUniversity className="mr-2 text-blue-500" /> Address & Course Selection
                  </h2>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        Date of Birth
                      </label>
                      <DatePicker
                        selected={formData.dob}
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select your date of birth"
                        className={`shadow appearance-none border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
                        Course
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.course ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      >
                        <option value="" disabled>
                          Select Course
                        </option>
                        <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                        <option value="MCA">Master of Computer Applications (MCA)</option>
                        <option value="BSc">Bachelor of Science (BSc)</option>
                        <option value="MA">Master of Arts (MA)</option>
                        <option value="MSc">Master of Science (MSc)</option>
                        <option value="PGDCA">Post Graduate Diploma in Computer Applications (PGDCA)</option>
                      </select>
                      {errors.course && <p className="text-red-500 text-xs italic">{errors.course}</p>}
                    </div>
                    {formData.course && (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                          Semester
                        </label>
                        <select
                          id="semester"
                          name="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className={`shadow appearance-none border ${errors.semester ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        >
                          <option value="" disabled>
                            Select Semester
                          </option>
                          {getSemesterOptions()}
                        </select>
                        {errors.semester && <p className="text-red-500 text-xs italic">{errors.semester}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment and Fee Details */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FaCreditCard className="mr-2 text-blue-500" /> Payment & Fee Details
                  </h2>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feeType">
                        Choose Fee Type
                      </label>
                      <select
                        id="feeType"
                        name="feeType"
                        value={formData.feeType}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.feeType ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      >
                        <option value="" disabled>
                          Select Fee Type
                        </option>
                        <option value="Subsidized">Subsidized</option>
                        <option value="Non-Subsidized">Non-Subsidized</option>
                      </select>
                      {errors.feeType && <p className="text-red-500 text-xs italic">{errors.feeType}</p>}
                    </div>
                    {formData.feeType && (
                      <p className="text-lg font-medium text-gray-700">
                        Fee Amount: ₹{getFeeAmount()}
                      </p>
                    )}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                        Select Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      >
                        <option value="" disabled>
                          Select Payment Method
                        </option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                      </select>
                      {errors.paymentMethod && <p className="text-red-500 text-xs italic">{errors.paymentMethod}</p>}
                      {upiUnavailable && (
                        <p className="text-red-500 mt-2">
                          UPI is currently unavailable. Please choose another payment method.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: ID Photo & Terms Agreement */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FaFileImage className="mr-2 text-blue-500" /> ID Photo & Terms Agreement
                  </h2>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNumber">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        placeholder="Enter your roll number"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {errors.rollNumber && <p className="text-red-500 text-xs italic">{errors.rollNumber}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idPhoto">
                        Upload College ID Photo
                      </label>
                      <input
                        type="file"
                        id="idPhoto"
                        name="idPhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors.idPhoto && <p className="text-red-500 text-xs italic">{errors.idPhoto}</p>}
                    </div>
                    {photoPreview && (
                      <div className="flex justify-center mb-4">
                        <img
                          src={photoPreview}
                          alt="ID Preview"
                          className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-blue-300"
                        />
                      </div>
                    )}
                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                      />
                      <label className="text-sm text-gray-700" htmlFor="agree">
                        I agree to the terms and conditions
                      </label>
                      {errors.agree && <p className="text-red-500 text-xs italic">{errors.agree}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  Previous
                </button>
                {currentStep === 4 ? (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>

            {/* Success Message */}
            {formSubmitted && (
              <div className="mt-6 text-green-600 text-center text-xl font-semibold flex items-center justify-center">
                <FaCheckCircle className="mr-2" /> Your application has been submitted successfully!
              </div>
            )}
          </div>

          {/* Receipt */}
          {showReceipt && <Receipt formData={formData} photoPreview={photoPreview} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Admission;