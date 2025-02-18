import React, { useState, useEffect, useRef } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid"; 
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggested questions for quick access
  const [suggestions] = useState([
    { label: "Courses", text: "List all available courses" },
    { label: "Admission Process", text: "Explain the admission process" },
    { label: "BCA", text: "Tell me about BCA course" },
    { label: "Eligibility", text: "What are the eligibility criteria?" },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle chat
  const toggleChat = () => setIsOpen((prev) => !prev);

  // Generate bot responses based on user input
  const botResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = "";
    if (lowerInput.includes("course") || lowerInput.includes("program")) {
      response = `
        <strong>Undergraduate Programs:</strong><br>
        🎓 BCA - 3 years<br>
        🎓 BSc (Computer Science, Mathematics, Physics) - 3 years<br>
        🎓 BCom (General & Computer Applications) - 3 years<br><br>
        <strong>Postgraduate Programs:</strong><br>
        🎓 MCA - 2 years<br>
        🎓 MSc (Mathematics, Computer Science) - 2 years<br><br>
        Ask about any specific program!`;
    } else if (lowerInput.includes("bca")) {
      response = `
        <strong>BCA:</strong><br>
        📚 3-year program focusing on software development<br>
        💻 Core subjects: Programming, DBMS, Web Technologies<br>
        💰 Fee: ₹25,000/year<br>
        🎯 Eligibility: 12th with Mathematics (50% marks)`;
    } else if (lowerInput.includes("mca")) {
      response = `
        <strong>MCA:</strong><br>
        📚 2-year postgraduate program<br>
        🖥️ Specializations: Cloud Computing, Data Analytics<br>
        💼 6-month compulsory internship<br>
        🎓 Eligibility: Bachelor's degree with Mathematics`;
    } else if (lowerInput.includes("admission process")) {
      response = `
        <strong>Admission Process:</strong><br>
        1. Online application at www.gdcbarsar.ac.in<br>
        2. Document verification<br>
        3. Merit-based selection<br>
        4. Fee payment within 7 days<br>
        **📅 Application deadline: 31st July 2024**`;
    } else if (lowerInput.includes("eligibility")) {
      response = `
        <strong>Eligibility Criteria:</strong><br>
        📜 UG Programs: 12th pass with relevant subjects<br>
        📜 PG Programs: Bachelor's degree in related field<br>
        📝 Minimum 50% aggregate for all programs`;
    } else {
      response = `
        I'm here to assist you with:<br>
        <ul class='list-disc pl-5 space-y-2'>
          <li>Course details</li>
          <li>Admission process</li>
          <li>Eligibility criteria</li>
          <li>Application deadlines</li>
        </ul>
        Ask me anything!`;
    }
    return response.replace(/<strong>/g, "🔹 <strong>");
  };

  // Handle sending user messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    // Add user message
    const userMessage = { from: "user", text: userInput, timestamp, isHTML: false };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    // Simulate bot processing
    setIsProcessing(true);
    setTimeout(() => {
      const botMessage = {
        from: "bot",
        text: botResponse(userInput),
        timestamp,
        isHTML: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (text) => {
    setUserInput(text);
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-700 to-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-50"
            onClick={toggleChat}
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6" aria-label="Open Chatbot" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 w-full max-w-[400px] h-[60vh] md:h-[600px] flex flex-col rounded-lg shadow-2xl overflow-hidden bg-white text-gray-800 z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center space-x-3">
                <ChatBubbleLeftRightIcon className="h-5 w-5" aria-label="Chatbot Icon" />
                <div>
                  <h4 className="text-lg font-bold">GDC Assistant</h4>
                  <p className="text-sm opacity-90">Online Now</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Chatbot"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.from === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none shadow-md"
                    }`}
                  >
                    {message.isHTML ? (
                      <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    ) : (
                      message.text
                    )}
                    <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex justify-center">
                  <SparklesIcon className="h-5 w-5 text-blue-500 animate-spin" aria-label="Processing" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="border-t border-gray-200 p-4">
              <div className="mb-3 grid grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm bg-gray-100 text-blue-500 p-2 rounded-md hover:bg-gray-200 transition-all"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    aria-label={suggestion.label}
                  >
                    {suggestion.label}
                  </motion.button>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm border rounded-full focus:ring focus:ring-blue-500 transition-all"
                  placeholder="Type your message..."
                  aria-label="Message Input"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all"
                  aria-label="Send Message"
                >
                  <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                </motion.button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-3">
                Powered by GDC • {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;