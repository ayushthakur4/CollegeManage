import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Receipt from '../components/Receipt';

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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

    if (name === "paymentMethod") {
      if (value === "UPI") {
        setUpiUnavailable(true);
      } else {
        setUpiUnavailable(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the terms and conditions before submitting.");
      return;
    }
    console.log("Form Submitted", formData);
    alert("Form Submitted Successfully!");

    setShowReceipt(true); 
    setFormSubmitted(true);
  };

  const getSemesterOptions = () => {
    if (formData.course === "BCA") {
      return Array.from({ length: 6 }, (_, i) => i + 1).map((sem) => (
        <option key={sem} value={sem}>
          Semester {sem}
        </option>
      ));
    }
    if (formData.course === "MCA") {
      return Array.from({ length: 4 }, (_, i) => i + 1).map((sem) => (
        <option key={sem} value={sem}>
          Semester {sem}
        </option>
      ));
    }
    return <option value="">Select course first</option>;
  };

  const getFeeAmount = () => {
    if (formData.course === "BCA") {
      return formData.feeType === "Subsidized" ? 7650 : 14800;
    }
    if (formData.course === "MCA") {
      return formData.feeType === "Subsidized" ? 7650 : 14800;
    }
    return 0;
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6 mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all duration-300 hover:shadow-3xl">
          <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            College Admission Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Details - Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Address & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="" disabled>Choose a course</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
              {formData.course && (
                <>
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">Select Semester</label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                      className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                      <option value="" disabled>Choose a semester</option>
                      {getSemesterOptions()}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="feeType" className="block text-sm font-medium text-gray-700 mb-2">Fee Type</label>
                    <select
                      id="feeType"
                      name="feeType"
                      value={formData.feeType}
                      onChange={handleChange}
                      required
                      className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                      <option value="" disabled>Choose fee type</option>
                      <option value="Subsidized">Subsidized</option>
                      <option value="Non-Subsidized">Non-Subsidized</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Display Fee Amount */}
            {formData.feeType && (
              <div className="mt-6 text-xl font-semibold text-blue-700">
                <p>Fee Amount: ₹{getFeeAmount()}</p>
              </div>
            )}

            {/* Roll Number & ID Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="idPhoto" className="block text-sm font-medium text-gray-700 mb-2">Upload College ID Photo</label>
                <input
                  type="file"
                  id="idPhoto"
                  name="idPhoto"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {photoPreview && (
                  <div className="mt-4">
                    <img src={photoPreview} alt="ID Preview" className="h-32 w-32 object-cover rounded-lg border-2 border-blue-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="mt-1 p-3 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="" disabled>Select a payment method</option>
                <option value="UPI">UPI</option>
                <option value="At College Office">At College Office</option>
              </select>
              {upiUnavailable && (
                <p className="mt-2 text-red-500 text-sm">UPI payment is currently unavailable. Please use a different payment method.</p>
              )}
            </div>

            {/* Agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree" className="ml-2 text-sm text-gray-700">I agree to the terms and conditions</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8 transition-all duration-300"
            >
              Submit
            </button>
          </form>

          {formSubmitted && <p className="mt-6 text-green-600 text-center">Your application has been submitted!</p>}
          {showReceipt && <Receipt formData={formData} photoPreview={photoPreview} />}
        </div>
      </div>
    </>
  );
};

export default Admission;