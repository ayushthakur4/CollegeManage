import React, { useRef } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeAre from './components/WhatWeAre';
import Footer from './components/Footer';
import BCA from './pages/BCA';
import Courses from './pages/Courses';
import { Route, Routes } from 'react-router-dom';
import Admission from './pages/Admission';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AddNotice from './pages/AddNotice';
import Performance from './pages/Performance';
import Student from './pages/Student';
import StudentLogin from './pages/StudentLogin';
import TaskManagement from './pages/TaskManagement'; 
import LearnMore from './pages/learnmore.jsx';

function Home() {
  const whatWeAreRef = useRef(null);

  const scrollToWhatWeAre = () => {
    if (whatWeAreRef.current) {
      whatWeAreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar scrollToWhatWeAre={scrollToWhatWeAre} />
      <Hero />
      <div ref={whatWeAreRef}>
        <WhatWeAre />
      </div>
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bca" element={<BCA />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll" element={<Admission />} />
        <Route path="/login" element={<Admin />} />
        <Route path="/dash" element={<AdminDashboard />} />
        <Route path="/add-notice" element={<AddNotice />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/student" element={<Student />} />
        <Route path="/stdlogin" element={<StudentLogin />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/learn" element={<LearnMore />} />
        <Route path="/goto" element={<WhatWeAre />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;