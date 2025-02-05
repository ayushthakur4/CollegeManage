import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions] = useState([
    { label: "Courses", text: "List all available courses" },
    { label: "Admission Process", text: "Explain the admission process" },
    { label: "BCA", text: "Tell me about BCA course" },
    { label: "Eligibility", text: "What are the eligibility criteria?" },
  ]);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

 // Enhanced Bot Response Function
const botResponse = (input) => {
  const lowerInput = input.toLowerCase(); // Convert input to lowercase
  let response = ""; // Initialize response

  // Course Information
  if (lowerInput.includes("course") || lowerInput.includes("program")) {
    response = `
      <strong>Undergraduate Programs:</strong><br>
      🎓 BCA (Bachelor of Computer Applications) - 3 years<br>
      🎓 BSc (Computer Science, Mathematics, Physics) - 3 years<br>
      🎓 BCom (General & Computer Applications) - 3 years<br><br>
      <strong>Postgraduate Programs:</strong><br>
      🎓 MCA (Master of Computer Applications) - 2 years<br>
      🎓 MSc (Mathematics, Computer Science) - 2 years<br><br>
      Ask about any specific program!`;
  }

  // Specific Course Details
  else if (lowerInput.includes("bca")) {
    response = `
      <strong>BCA (Bachelor of Computer Applications):</strong><br>
      📚 3-year program focusing on software development<br>
      💻 Core subjects: Programming, DBMS, Web Technologies<br>
      💰 Fee: ₹25,000/year<br>
      🎯 Eligibility: 12th with Mathematics (50% marks)`;
  } else if (lowerInput.includes("mca")) {
    response = `
      <strong>MCA (Master of Computer Applications):</strong><br>
      📚 2-year postgraduate program<br>
      🖥️ Specializations: Cloud Computing, Data Analytics<br>
      💼 6-month compulsory internship<br>
      🎓 Eligibility: Bachelor's degree with Mathematics`;
  } else if (lowerInput.includes("bcom")) {
    response = `
      <strong>BCom Programs:</strong><br>
      🏦 BCom General - Traditional commerce subjects<br>
      💻 BCom (Computer Applications) - Commerce + IT skills<br>
      📊 Both 3-year programs with Tally & GST training`;
  }

  // Admission Information
  else if (lowerInput.includes("admission process")) {
    response = `
      <strong>Admission Process:</strong><br>
      1. Online application at www.gdcbarsar.ac.in<br>
      2. Document verification<br>
      3. Merit-based selection<br>
      4. Fee payment within 7 days<br>
      5.  <a href="http://localhost:5173/admission" target="_blank"><b><u>Click Here<u><b></a><br>
       **📅 Application deadline: 31st July 2024<br>`
  }

  // Eligibility Information
  else if (lowerInput.includes("eligibility")) {
    response = `
      <strong>Eligibility Criteria:</strong><br>
      📜 UG Programs: 12th pass with relevant subjects<br>
      📜 PG Programs: Bachelor's degree in related field<br>
      📝 Minimum 50% aggregate for all programs<br>
      🌐 International students: Equivalence certificate required`;
  }

  // Application Deadline Information
  else if (lowerInput.includes("deadline")) {
    response = `
      <strong>Important Dates:</strong><br>
      📌 Application start: 1st June 2024<br>
      📌 Last date: 31st July 2024<br>
      📌 Classes begin: 1st August 2024<br>
      ⏰ Late applications with ₹500 penalty accepted till 7th August`;
  }

  // Default response for unrecognized inputs
  else {
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


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { from: "user", text: userInput, isHTML: false };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    setIsProcessing(true);
    setTimeout(() => {
      const botMessage = {
        from: "bot",
        text: botResponse(userInput),
        isHTML: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleSuggestionClick = (text) => {
    setUserInput(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chatbot Icon */}
      {!isOpen && (
        <div
          className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition duration-300"
          onClick={toggleChat}
          style={{ zIndex: 9999 }}
        >
          <FaRobot className="text-3xl animate-bounce" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-8 right-8 w-80 bg-white shadow-xl rounded-lg border border-gray-100 flex flex-col  "
        
          style={{ zIndex: 9999, height: "500px"   }}
        >
          {/*  Header */}
          <div className="bg-gradient-to-r from-[#45a5f4] to-[#14b8a6] text-white p-3 flex justify-between items-center rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/10 rounded-full">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h4 className="text-md font-bold">GDC Assistant</h4>
                <p className="text-xs opacity-90">Online Now</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes className="text-md" />
            </button>
          </div>

          {/* Chatbot Body */}
          <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-b from-blue-50 to-white ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.from === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`max-w-[85%] p-2 rounded-lg text-sm ${
                    message.from === "user"
                      ? "bg-[#2a7bf3] text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-md"
                  }`}
                >
                  {message.isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-center">
                <FaSpinner className="text-[#3885e4] animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chatbot Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="mb-3 grid grid-cols-2 gap-1.5">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-xs bg-gray-100 text-[#2a6ac9] p-2 rounded-md hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-1.5">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-full focus:ring focus:ring-[#3e94f7]"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="p-2 bg-[#3c8af6] text-white rounded-full hover:bg-[#335eeb]"
              >
                <FaPaperPlane />
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-3">
              Powered by GDC • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
