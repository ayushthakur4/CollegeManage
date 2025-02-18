import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/hpu1.webp"; // Ensure this is optimized (e.g., WebP format)
import loginImage from "../assets/login.jpg"; // Import the new login image

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (
      (isAdmin && username === "admin" && password === "1234") ||
      (!isAdmin && username === "student" && password === "1234")
    ) {
      navigate(isAdmin ? "/dash" : "/student");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Login Container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left  Image */}
        <div className="hidden md:block w-full md:w-1/2 relative">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <img src={logo} alt="Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">
              {isAdmin ? "Admin Portal" : "Student Gateway"}
            </h1>
            <p className="text-sm text-gray-600">Welcome! Log in to access your account.</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 bg-blue-50 p-1 rounded-full">
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 rounded-full transition-all ${
                isAdmin
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 rounded-full transition-all ${
                !isAdmin
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Student
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute top-3 left-3 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute top-3 left-3 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg transition-all hover:from-blue-700 hover:to-blue-900"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Home Button */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;