import React, { useState, useEffect, useRef } from "react";
import { FaUpload, FaDownload, FaUser, FaChartLine, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaArrowDown, FaTrashAlt, FaArrowLeft, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Performance = () => {
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem("students")) || {});
  const [semester, setSemester] = useState("Semester 1");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Ref for detecting clicks outside the dropdown
  const dropdownRef = useRef(null);

  // Filter students based on search query
  const filteredStudents = (students[semester] || []).filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toString().includes(searchQuery)
  );

  // Calculate attendance percentage
  const calculateAttendance = (student) => {
    const attendance = student.attendance || {};
    const presentDays = Object.values(attendance).filter(status => status === "Present").length;
    const totalDays = Object.keys(attendance).length;
    const percentage = totalDays ? (presentDays / totalDays) * 100 : 0;
    return { percentage, presentDays, absentDays: totalDays - presentDays };
  };

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  // Handle score changes
  const handleScoreChange = (type, value) => {
    const updatedStudent = { ...selectedStudent, [type]: value };
    const updatedStudents = { ...students, [semester]: students[semester].map(s => s.id === selectedStudent.id ? updatedStudent : s) };
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setSelectedStudent(updatedStudent);
  };
//this is file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return alert("No file selected!");
  
    // Validate file type
    const allowedTypes = [
      "application/pdf", // PDF files
      "application/vnd.ms-excel", // .xls files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx files
    ];
  
    if (!allowedTypes.includes(file.type)) {
      return alert("Invalid file format! Please upload a PDF or Excel file.");
    }
  
    // Validate file size (5MB limit)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      return alert("File size exceeds the maximum limit of 5MB.");
    }
  
    // Read the file as a Base64 string
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result; // Base64 string
  
      // Update student data with the file name and content
      const updatedStudent = {
        ...selectedStudent,
        resultFile: file.name,
        resultFileContent: fileContent, // Store the file content
      };
  
      const updatedStudents = {
        ...students,
        [semester]: students[semester].map((s) =>
          s.id === selectedStudent.id ? updatedStudent : s
        ),
      };
  
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setSelectedStudent(updatedStudent);
    };
  
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Failed to read the file. Please try again.");
    };
  
    reader.readAsDataURL(file); // Read the file as a Base64 string
  };
  // Handle removing data
  const handleRemove = (type) => {
    const updatedStudent = { ...selectedStudent, [type]: null };
    const updatedStudents = { ...students, [semester]: students[semester].map(s => s.id === selectedStudent.id ? updatedStudent : s) };
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setSelectedStudent(updatedStudent);
  };

  // Handle downloading results
  const handleDownloadResult = () => {
    if (selectedStudent?.resultFileContent) {
      const a = document.createElement("a");
      a.href = selectedStudent.resultFileContent; // Base64 string
      a.download = selectedStudent.resultFile; // File name
      a.click();
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Student Card Component
  const StudentCard = ({ student }) => {
    const { percentage, presentDays, absentDays } = calculateAttendance(student);
    const attendanceColor = percentage >= 80 ? "bg-emerald-500" : percentage >= 50 ? "bg-yellow-500" : "bg-red-500";

    return (
      <div
        className={`p-6 bg-white rounded-3xl shadow-xl cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl ${selectedStudent?.id === student.id ? "ring-4 ring-teal-400" : ""}`}
        onClick={() => handleStudentSelect(student)}
      >
        <div className="flex items-center mb-4">
          <FaUser className={`text-5xl ${attendanceColor} mr-4 p-2 rounded-full`} />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center text-sm text-gray-600"><FaCalendarAlt className="mr-2" /> Attendance</span>
            <span className="text-sm font-semibold">{percentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className={`${attendanceColor} h-full`} style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span><FaCheckCircle className="inline mr-1 text-green-500" /> {presentDays} Present</span>
            <span><FaExclamationTriangle className="inline mr-1 text-red-500" /> {absentDays} Absent</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-teal-100 to-purple-100 pt-20 p-6"> {/* Increased gradient stops */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600">
              Academic Performance <span className="from-pink-600 to-purple-600 ml-2">Dashboard</span>
            </h1>

            {/* Semester Dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex justify-center w-full px-8 py-4 text-lg font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <FaArrowDown className="mr-2 text-teal-500" />
                {semester}
                <svg
                  className={`-mr-1 ml-2 h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="semester-dropdown">
                    {[...Array(6)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSemester(`Semester ${i + 1}`);
                          setIsDropdownOpen(false); // Close dropdown after selection
                        }}
                        className={`block w-full px-4 py-3 text-lg text-left text-gray-700 hover:bg-teal-50 hover:text-teal-900 ${
                          semester === `Semester ${i + 1}` ? "bg-teal-50 text-teal-900" : ""
                        }`}
                        role="menuitem"
                      >
                        Semester {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Roll No or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 w-full text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Main Content */}
          {!showDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
              <button
                onClick={() => setShowDetails(false)}
                className="mb-6 flex items-center text-teal-600 hover:text-teal-800 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back to Students
              </button>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 space-y-6">
                  <div className="text-center">
                    <FaUser className="text-8xl text-teal-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">{selectedStudent.name}</h2>
                    <p className="text-gray-600">Roll No: {selectedStudent.rollNo}</p>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-2xl shadow-md">
                    <h3 className="font-semibold mb-4 flex items-center"><FaChartLine className="mr-2" /> Performance Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Attendance:</span>
                        <span className="font-semibold">{calculateAttendance(selectedStudent).percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><FaUpload className="mr-2" /> Upload Result</h3>
                    <div className="p-10 border-4 border-dashed border-gray-300 rounded-3xl text-center">
                      <FaUpload className="text-6xl text-indigo-500 mx-auto mb-6" />
                      <input type="file" onChange={handleFileUpload} accept=".pdf, .xlsx, .xls" className="text-center" />
                      <p className="text-gray-500 mt-2">Upload Result (PDF/Excel)</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><FaUpload className="mr-2" /> Academic Records</h3>
                    <div className="space-y-6">
                      {["assignmentScore", "examScore"].map((type) => (
                        <div key={type}>
                          <label className="text-gray-700 block mb-2">{type === "assignmentScore" ? "Assignment Score (Out of 20)" : "Exam Score (Out of 100)"}</label>
                          <input
                            type="number"
                            className="w-full p-4 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder={`Enter ${type === "assignmentScore" ? "assignment" : "exam"} score`}
                            value={selectedStudent[type] || ""}
                            onChange={(e) => handleScoreChange(type, e.target.value)}
                          />
                          <button
                            onClick={() => handleRemove(type)}
                            className="text-red-500 mt-2 flex items-center hover:text-red-700 transition-colors"
                          >
                            <FaTrashAlt className="mr-1" /> Remove {type === "assignmentScore" ? "Assignment" : "Exam"} Score
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedStudent.resultFile && (
                    <div className="mt-6 p-6 bg-green-50 rounded-2xl shadow-md flex items-center justify-between">
                      <span className="text-teal-700">Uploaded: {selectedStudent.resultFile}</span>
                      <div className="flex items-center">
                        <button
                          onClick={handleDownloadResult}
                          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg hover:from-teal-600 hover:to-green-600 transition-all mr-4"
                        >
                          <FaDownload className="inline mr-2" /> Download
                        </button>
                        <button
                          onClick={() => handleRemove("resultFile")}
                          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <FaTrashAlt className="inline mr-2" /> Remove Result
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Performance;