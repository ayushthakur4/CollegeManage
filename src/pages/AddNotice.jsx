import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FiDownload, FiTrash2, FiPlusCircle, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AddNotice = () => {
  const [notice, setNotice] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [notices, setNotices] = useState(() => {
    const savedNotices = localStorage.getItem('notices');
    return savedNotices ? JSON.parse(savedNotices) : [];
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('notices', JSON.stringify(notices));
  }, [notices]);

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
    setError('');
  };

  const addNotice = () => {
    if (!notice.trim() || !pdfFile) {
      setError('Please fill both fields before submitting');
      return;
    }

    const newNotice = { 
      title: notice, 
      file: URL.createObjectURL(pdfFile),
      fileName: pdfFile.name,
      date: new Date().toLocaleDateString('en-GB')
    };
    
    setNotices(prev => [newNotice, ...prev]);
    setNotice('');
    setPdfFile(null);
    setError('');
  };

  const removeNotice = (index) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      {/* Navbar with sticky positioning */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Background image and overlay */}
      <div 
        className="min-h-screen bg-cover bg-center p-8 pt-20" // Added pt-20 to add padding to the top
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Notice Management</h1>
            <p className="text-gray-200">Manage and publish institutional notices</p>
          </div>

          {/* Add Notice Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiPlusCircle className="text-emerald-600" />
              Create New Notice
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Title
                </label>
                <input
                  type="text"
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                  placeholder="Enter notice title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF Document
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />
                    <div className="w-full p-3 border border-gray-300 rounded-lg hover:border-emerald-500 transition-colors">
                      {pdfFile ? (
                        <span className="text-emerald-600 flex items-center gap-2">
                          <FiFileText /> {pdfFile.name}
                        </span>
                      ) : (
                        <span className="text-gray-500">Select PDF file</span>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                onClick={addNotice}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiPlusCircle /> Publish Notice
              </button>
            </div>
          </motion.div>

          {/* Notices List */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiFileText /> Published Notices ({notices.length})
            </h2>

            {notices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notices published yet
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {notices.map((notice, index) => (
                    <motion.div
                      key={index}
                      className="group flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{notice.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {notice.fileName} • Uploaded {notice.date}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <a
                          href={notice.file}
                          download
                          className="p-2 text-gray-600 hover:text-emerald-600 rounded-md hover:bg-gray-100 transition-colors"
                          title="Download"
                        >
                          <FiDownload size={20} />
                        </a>
                        <button
                          onClick={() => removeNotice(index)}
                          className="p-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddNotice;