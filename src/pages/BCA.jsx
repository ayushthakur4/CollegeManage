import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import {
  FaCheck,
  FaTimes,
  FaPencilAlt,
  FaTrashAlt,
  FaFileUpload,
  FaChartPie,
  FaSearch,
} from 'react-icons/fa';

const holidays = ['2024-12-25', '2024-12-31'];

const isHoliday = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || holidays.includes(date);
};

const BCA = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : {};
  });
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('Semester 1');
  const [rollNumber, setRollNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [quote, setQuote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttendanceHistory, setShowAttendanceHistory] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    const quotes = [
      "Education is the most powerful weapon you can use to change the world.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Success is not the key to happiness. Happiness is the key to success.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const addStudent = () => {
    if (name.trim() && rollNumber) {
      const newStudent = { id: Date.now(), name, semester, rollNumber, attendance: {}, time: '' };
      setStudents((prevStudents) => ({
        ...prevStudents,
        [semester]: prevStudents[semester] ? [...prevStudents[semester], newStudent] : [newStudent],
      }));
      setName('');
      setRollNumber('');
    }
  };

  const removeStudent = (id, semester) => {
    setStudents((prevStudents) => ({
      ...prevStudents,
      [semester]: prevStudents[semester].filter((student) => student.id !== id),
    }));
  };

  const markAttendance = (id, semester, status, date) => {
    if (isHoliday(date)) {
      alert('Cannot mark attendance on holidays or Sundays.');
      return;
    }
    const currentTime = new Date().toLocaleString();
    setStudents((prevStudents) => ({
      ...prevStudents,
      [semester]: prevStudents[semester].map((student) =>
        student.id === id
          ? { ...student, attendance: { ...student.attendance, [date]: status }, time: currentTime }
          : student
      ),
    }));
  };

  const downloadAttendanceSheet = (semester) => {
    const semesterStudents = students[semester] || [];
    const formattedStudents = semesterStudents.map((student) => {
      const attendanceDays = Object.keys(student.attendance).filter((date) => !isHoliday(date));
      const presentDays = attendanceDays.filter((date) => student.attendance[date] === 'Present').length;
      const attendancePercentage =
        attendanceDays.length === 0 ? 0 : ((presentDays / attendanceDays.length) * 100).toFixed(2);
      return {
        Name: student.name,
        RollNumber: student.rollNumber,
        TotalLecturesAttended: presentDays,
        TotalLectures: attendanceDays.length,
        AttendancePercentage: attendancePercentage,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(formattedStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, `${semester}_attendance.xlsx`);
  };

  const calculateAttendancePercentage = (student) => {
    const attendanceDays = Object.keys(student.attendance).filter((date) => !isHoliday(date));
    const totalDays = attendanceDays.length;
    if (totalDays === 0) return 0;
    const presentDays = attendanceDays.filter((date) => student.attendance[date] === 'Present').length;
    return ((presentDays / totalDays) * 100).toFixed(2);
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const newStudents = parsedData.map((row) => ({
        id: Date.now() + Math.random(),
        name: row.Name,
        semester: row.Semester,
        rollNumber: row.RollNumber,
        attendance: {},
        time: '',
      }));
      setStudents((prevStudents) => ({
        ...prevStudents,
        [semester]: [...(prevStudents[semester] || []), ...newStudents],
      }));
    };
    reader.readAsArrayBuffer(file);
  };

  const filteredStudents =
    searchQuery.trim() === ''
      ? students[semester] || []
      : (students[semester] || []).filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.rollNumber.toString().includes(searchQuery)
        );

  const attendanceChartData = {
    labels: filteredStudents.map((student) => student.name),
    datasets: [
      {
        label: 'Attendance Percentage',
        data: filteredStudents.map((student) => calculateAttendancePercentage(student)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-16">
        {/* BCA Course Header */}
        <div className="card bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-xl rounded-lg mb-8 p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24">
              <img
                src="https://as1.ftcdn.net/v2/jpg/08/78/88/98/1000_F_878889846_TUfXX4YYYoTTC00wMyGBgjeEUHfYvVhL.jpg"
                alt="BCA"
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Bachelor of Computer Applications</h1>
              <p className="text-lg opacity-80 italic">{quote}</p>
            </div>
          </div>
        </div>

        {/* Manage Students Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-3xl font-semibold mb-4">Manage Students</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="input input-bordered w-full sm:w-1/3"
            />
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="input input-bordered w-full sm:w-1/3"
            >
              {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter roll number"
              className="input input-bordered w-full sm:w-1/3"
            />
            <button onClick={addStudent} className="btn bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto">
              Add Student
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              id="attendanceDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input input-bordered w-full sm:w-1/4"
            />
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleBulkUpload}
              className="hidden"
              id="bulkUpload"
            />
            <label htmlFor="bulkUpload" className="btn btn-outline btn-sm text-gray-700">
              <FaFileUpload className="mr-2" /> Bulk Upload
            </label>
          </div>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
          <ul className="space-y-4">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <span className="text-lg font-medium block">{student.rollNumber} - {student.name}</span>
                  <span className="text-sm text-gray-500">
                    {student.attendance[selectedDate] || 'Absent'} - {student.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => markAttendance(student.id, semester, 'Present', selectedDate)}
                      className="btn btn-success btn-sm text-white"
                    >
                      <FaCheck className="mr-2" /> Present
                    </button>
                    <button
                      onClick={() => markAttendance(student.id, semester, 'Absent', selectedDate)}
                      className="btn btn-error btn-sm text-white"
                    >
                      <FaTimes className="mr-2" /> Absent
                    </button>
                    <button
                      onClick={() => markAttendance(student.id, semester, 'Leave', selectedDate)}
                      className="btn btn-warning btn-sm text-white"
                    >
                      <FaPencilAlt className="mr-2" /> Leave
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-auto sm:ml-4">
                    <div className="text-right sm:text-left">
                      <span className="font-bold block">Attendance: {calculateAttendancePercentage(student)}%</span>
                      <span>{Object.keys(student.attendance).length} Lectures</span>
                    </div>
                    <button
                      onClick={() => setShowAttendanceHistory(student)}
                      className="btn btn-outline btn-sm text-gray-700"
                    >
                      <FaChartPie />
                    </button>
                    <button
                      onClick={() => removeStudent(student.id, semester)}
                      className="btn btn-outline btn-sm text-gray-700"
                      aria-label="Delete student"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => downloadAttendanceSheet(semester)}
            className="btn bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto mt-6"
          >
            Download {semester} Attendance Sheet
          </button>
        </div>


        {/* Attendance History */}
        {showAttendanceHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
              <h3 className="text-xl font-bold mb-4">Attendance History - {showAttendanceHistory.name}</h3>
              <ul className="space-y-2">
                {Object.entries(showAttendanceHistory.attendance).map(([date, status]) => (
                  <li key={date} className="flex justify-between">
                    <span>{date}</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        status === 'Present'
                          ? 'bg-green-500 text-white'
                          : status === 'Absent'
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowAttendanceHistory(null)}
                className="btn btn-outline mt-4 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BCA;