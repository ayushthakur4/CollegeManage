import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleStudentLogin = (e) => {
    e.preventDefault();
    // login page logic ....!
    if (username === 'student' && password === 'student123') {
      console.log('Student logged in successfully');
      localStorage.setItem('studentAuthenticated', 'true');
      navigate('/student');
    } else {
      console.log('Invalid student credentials');
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 via-#035d1a to-green-800 p-4 sm:p-6 relative overflow-hidden">
      <div className="relative z-10 bg-white p-10 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 animate-slide-in-top">Student Login</h2>
        <form onSubmit={handleStudentLogin}>
          <div className="mb-4 animate-slide-in-left">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 animate-slide-in-right">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 via-#035d1a to-green-800 text-white font-bold py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-900 focus:outline-none focus:shadow-outline transition-transform transform hover:scale-110 animate-bounce-in"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
