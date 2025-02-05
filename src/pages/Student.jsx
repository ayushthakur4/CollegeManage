import React, { useState, useMemo, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from '../components/Navbar';
import { FaUser, FaDownload, FaSearch, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaPauseCircle, FaArrowLeft, FaBell } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

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

  const handleDownloadResult = useCallback(async () => {
    if (!selectedStudent?.resultFile) return;
    setLoading(true);
    try {
      const a = document.createElement('a');
      a.href = `/results/${selectedStudent.resultFile}`;
      a.download = selectedStudent.resultFile;
      a.click();
    } catch (error) {
      console.error('Error downloading result:', error);
      alert('Failed to download result.');
    } finally {
      setLoading(false);
    }
  }, [selectedStudent]);

  const getMarksColor = (marks, maxMarks) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 80) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (percentage >= 50) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  const barData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [
      {
        label: 'Attendance Status',
        data: [attendanceData.presentDays, attendanceData.absentDays, attendanceData.leaveDays],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const StudentCard = ({ student }) => {
    const { percentage, presentDays, absentDays, leaveDays } = calculateAttendance(student);
    const attendanceColor = percentage >= 80 ? "bg-gradient-to-r from-green-400 to-green-600" : percentage >= 50 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-gradient-to-r from-red-400 to-red-600";

    return (
      <div
        className={`p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl ${selectedStudent?.id === student.id ? "ring-4 ring-teal-400" : ""}`}
        onClick={() => handleStudentSelect(student)}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
            <FaUser className="text-2xl text-teal-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-600">#{student.rollNumber} • {semester}</p>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center text-sm text-gray-600"><FaCalendarAlt className="mr-2" /> Attendance</span>
            <span className="text-sm font-semibold">{percentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${attendanceColor} rounded-full h-2`} style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span><FaCheckCircle className="inline mr-1 text-green-500" /> {presentDays} Present</span>
            <span><FaExclamationTriangle className="inline mr-1 text-red-500" /> {absentDays} Absent</span>
            <span><FaPauseCircle className="inline mr-1 text-yellow-500" /> {leaveDays} Leave</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Student Portal</h2>

        {/* Notifications */}
        <div className="mb-6 flex justify-between items-center bg-yellow-100/80 backdrop-blur-md p-4 rounded-lg">
          <div className="flex items-center">
            <FaBell className="mr-2 text-yellow-600" />
            <span className="text-yellow-600">{notifications.length} New Notifications</span>
          </div>
          <button onClick={() => setNotifications([])} className="text-yellow-600 hover:text-yellow-800">
            Clear Notifications
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-4">
          <select value={semester} onChange={e => setSemester(e.target.value)} className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/80 backdrop-blur-md">
            {[...Array(6)].map((_, i) => <option key={i} value={`Semester ${i + 1}`}>Semester {i + 1}</option>)}
          </select>
          <div className="relative w-1/2">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Search by name or roll number..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/80 backdrop-blur-md" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>

        {!showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-sm border border-gray-200">
            <button onClick={() => setShowDetails(false)} className="mb-4 flex items-center text-teal-600 hover:text-teal-800"><FaArrowLeft className="mr-2" /> Back to Students</button>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><FaUser className="text-teal-600" /> {selectedStudent.name}</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-teal-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-teal-600">{attendanceData.presentDays}</p>
                <p className="text-sm text-teal-700">Present</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{attendanceData.absentDays}</p>
                <p className="text-sm text-red-700">Absent</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-amber-600">{attendanceData.leaveDays}</p>
                <p className="text-sm text-amber-700">Leave</p>
              </div>
            </div>

            {/* Attendance History Bar Chart */}
            <div className="w-full h-72 mb-6">
              <Bar data={barData} options={barOptions} />
            </div>

            {/* Marks and Assignment Scores */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Academic Performance</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700">Assignment Score (Out of 20)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{selectedStudent.assignmentScore || 0}/20</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${getMarksColor(selectedStudent.assignmentScore, 20)} h-2 rounded-full`} style={{ width: `${(selectedStudent.assignmentScore || 0) / 20 * 100}%` }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700">Exam Score (Out of 100)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{selectedStudent.examScore || 0}/100</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${getMarksColor(selectedStudent.examScore, 100)} h-2 rounded-full`} style={{ width: `${(selectedStudent.examScore || 0) / 100 * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleDownloadAttendance} className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-colors flex items-center justify-center gap-2"><FaDownload /> Export Attendance</button>
            {selectedStudent.resultFile && (
              <button onClick={handleDownloadResult} disabled={loading} className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader size="small" /> : <><FaDownload /> Download Report</>}
              </button>
            )}
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Password</h3>
              <input
                type="password"
                placeholder="Enter password (Roll Number)"
                className="w-full p-2 border rounded-lg mb-4 bg-white/80 backdrop-blur-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Student;