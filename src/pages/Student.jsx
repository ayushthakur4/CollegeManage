import React, { useState, useMemo, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from '../components/Navbar';
import { FaUser, FaDownload, FaSearch, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaPauseCircle, FaArrowLeft, FaBell } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { motion } from 'framer-motion';

Chart.register(...registerables);

const Student = () => {
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem('students')) || {});
  const [semester, setSemester] = useState('Semester 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [notifications, setNotifications] = useState([]);

  const filteredStudents = useMemo(() => {
    if (!students[semester]) return [];
    return students[semester].filter(({ name, rollNumber }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, semester, searchQuery]);

  const handleStudentSelect = useCallback((student) => {
    setSelectedStudent(student);
    setShowPasswordModal(true);
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    if (password === selectedStudent.rollNumber) {
      setShowDetails(true);
      setShowPasswordModal(false);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  }, [password, selectedStudent]);

  const calculateAttendance = useCallback(({ attendance = {} }) => {
    const totalDays = Object.keys(attendance).length;
    const presentDays = Object.values(attendance).filter(status => status === 'Present').length;
    const absentDays = Object.values(attendance).filter(status => status === 'Absent').length;
    const leaveDays = Object.values(attendance).filter(status => status === 'Leave').length;
    return { presentDays, absentDays, leaveDays, percentage: totalDays ? (presentDays / totalDays) * 100 : 0 };
  }, []);

  const attendanceData = useMemo(() =>
    selectedStudent ? calculateAttendance(selectedStudent) : { presentDays: 0, absentDays: 0, leaveDays: 0, percentage: 0 },
    [selectedStudent, calculateAttendance]);

  const handleDownloadAttendance = useCallback(() => {
    if (!selectedStudent) return;
    const attendanceList = Object.entries(selectedStudent.attendance || {}).map(([date, status]) => ({ Date: date, Status: status }));
    const ws = XLSX.utils.json_to_sheet(attendanceList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `${selectedStudent.name}_Attendance.xlsx`);
  }, [selectedStudent]);

  const handleDownloadResult = useCallback(() => {  // useCallback added here
    if (selectedStudent?.resultFileContent) {
      const a = document.createElement("a");
      a.href = selectedStudent.resultFileContent;
      a.download = selectedStudent.resultFile;
      a.click();
    }
  }, [selectedStudent]);

  const getMarksColor = (marks, maxMarks) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const barData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      {
        label: 'Attendance Status',
        data: [attendanceData.presentDays, attendanceData.absentDays, attendanceData.leaveDays],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6b7280'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#6b7280',
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const StudentCard = ({ student }) => {
    const { percentage, presentDays, absentDays, leaveDays } = calculateAttendance(student);

    return (
      <motion.div
        className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => handleStudentSelect(student)}
        whileHover={{ y: -5 }}
      >
        <div className="bg-gray-100 p-4">
          <FaUser className="text-teal-500 text-5xl mx-auto block" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{student.name}</h3>
          <p className="text-gray-600 text-sm mb-2">#{student.rollNumber}</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span><FaCheckCircle className="inline mr-1 text-green-500" /> {presentDays}</span>
            <span><FaExclamationTriangle className="inline mr-1 text-red-500" /> {absentDays}</span>
            <span><FaPauseCircle className="inline mr-1 text-yellow-500" /> {leaveDays}</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Attendance:</span>
              <span className="font-semibold">{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-3xl font-extrabold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Student Performance Dashboard
        </motion.h1>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <select
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {[...Array(6)].map((_, i) => (
              <option key={i} value={`Semester ${i + 1}`}>Semester {i + 1}</option>
            ))}
          </select>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              className="block w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
        {!showDetails ? (
          filteredStudents.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </motion.div>
          ) : (
            <EmptyState message="No students found for this semester." />
          )
        ) : (
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors mb-4"
            >
              <FaArrowLeft className="mr-2" /> Back to Students
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  <FaUser className="inline-block mr-2 text-teal-500" />{selectedStudent.name}
                </h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-gray-600 text-sm">Roll Number: {selectedStudent.rollNumber}</p>
                  <p className="text-gray-600 text-sm">Semester: {semester}</p>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Attendance Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{attendanceData.presentDays}</div>
                      <div className="text-sm text-gray-500">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{attendanceData.absentDays}</div>
                      <div className="text-sm text-gray-500">Absent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{attendanceData.leaveDays}</div>
                      <div className="text-sm text-gray-500">Leave</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Attendance Chart</h4>
                <div className="relative h-64">
                  <Bar data={barData} options={barOptions} />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Assignment Score (Out of 20)</span>
                      <span className="font-semibold">{selectedStudent.assignmentScore || 0}/20</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(selectedStudent.assignmentScore / 20) * 100}%`,
                          backgroundColor: getMarksColor(selectedStudent.assignmentScore, 20),
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Exam Score (Out of 100)</span>
                      <span className="font-semibold">{selectedStudent.examScore || 0}/100</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(selectedStudent.examScore / 100) * 100}%`,
                          backgroundColor: getMarksColor(selectedStudent.examScore, 100),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleDownloadAttendance}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaDownload className="mr-2" /> Export Attendance
              </button>
              {selectedStudent.resultFileContent && ( // Check if result file content exists
                <button
                  onClick={handleDownloadResult}
                  disabled={loading}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader size="small" /> : <><FaDownload className="mr-2" /> Download Report</>}
                </button>
              )}
            </div>
          </motion.div>
        )}
        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Password</h3>
              <input
                type="password"
                placeholder="Enter Roll Number"
                className="w-full p-3 border rounded-md mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mb-3">{passwordError}</p>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={handlePasswordSubmit}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;