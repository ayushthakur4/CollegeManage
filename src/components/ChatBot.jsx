import React, { useState, useEffect, useRef } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { label: "Courses", text: "List all available courses" },
    { label: "Admission", text: "Explain the admission process" },
    { label: "BCA", text: "Tell me about BCA course" },
    { label: "Eligibility", text: "What are the eligibility criteria?" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const botResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = "";
    if (lowerInput.includes("course") || lowerInput.includes("program")) {
      response = `
        <strong>Available Programs:</strong><br>
        <span class="text-green-400">Undergraduate:</span><br>
        🎓 BCA - 3 years<br>
        🎓 BSc (CS/Math/Physics) - 3 years<br>
        🎓 BCom (General/CA) - 3 years<br><br>
        <span class="text-green-400">Postgraduate:</span><br>
        🎓 MCA - 2 years<br>
        🎓 MSc (Math/CS) - 2 years<br><br>
        Type a program name for details!`;
    } else if (lowerInput.includes("bca")) {
      response = `
        <strong>BCA Details:</strong><br>
        📚 Duration: 3 years<br>
        💻 Focus: Software Development<br>
        📖 Subjects: Programming, DBMS, Web Tech<br>
        💰 Fees: ₹25,000/year<br>
        ✅ Eligibility: 12th (Math, 50%)`;
    } else if (lowerInput.includes("admission")) {
      response = `
        <strong>Admission Steps:</strong><br>
        1️⃣ Apply at <a href="/enroll" class="text-green-400 hover:underline">Enroll Now</a><br>
        2️⃣ Document Verification<br>
        3️⃣ Merit Selection<br>
        4️⃣ Pay Fees (7 days)<br>
        ⏰ Deadline: July 31, 2025`;
    } else if (lowerInput.includes("eligibility")) {
      response = `
        <strong>Eligibility:</strong><br>
        📚 UG: 12th Pass (50%)<br>
        📚 PG: Bachelor’s Degree (50%)<br>
        📝 Specific subjects may apply`;
    } else {
      response = `
        Hey there! I can help with:<br>
        ✨ Courses & Programs<br>
        ✨ Admission Info<br>
        ✨ Eligibility Rules<br>
        ✨ Deadlines<br>
        What’s on your mind?`;
    }
    return response;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage = { from: "user", text: userInput, timestamp, isHTML: false };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsProcessing(true);

    setTimeout(() => {
      const botMessage = { from: "bot", text: botResponse(userInput), timestamp, isHTML: true };
      setMessages((prev) => [...prev, botMessage]);
      setIsProcessing(false);
    }, 800);
  };

  const handleSuggestionClick = (text) => setUserInput(text);

  return (
    <>
      {/* Floating Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="fixed bottom-6 right-6 bg-gradient-to-br from-green-600 to-green-400 text-white p-4 rounded-full shadow-xl cursor-pointer z-50"
            onClick={toggleChat}
            aria-label="Open Chatbot"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[360px] max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-40 bg-white text-gray-900"
            style={{ top: "4rem" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-600 to-green-400 text-white shrink-0">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 animate-pulse" />
                <div>
                  <h4 className="text-base font-semibold">GDC AI</h4>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded-full"
                aria-label="Close Chatbot"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-sm opacity-70">Start chatting!</div>
              )}
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-2 rounded-lg text-sm shadow-sm ${
                      message.from === "user"
                        ? "bg-gradient-to-r from-green-500 to-green-300 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.isHTML ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: message.text.replace(
                            /<a href="\/enroll" class="text-green-400 hover:underline">Enroll Now<\/a>/,
                            '<Link to="/enroll" class="text-green-400 hover:underline">Enroll Now</Link>'
                          ),
                        }}
                      />
                    ) : (
                      message.text
                    )}
                    <p className="text-xs opacity-60 mt-1 text-right">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="p-2 rounded-lg text-sm flex items-center gap-2 bg-gray-100 text-gray-900">
                    <SparklesIcon className="h-4 w-4 animate-spin text-green-500" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 shrink-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-green-600 hover:bg-gray-200"
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
                  className="flex-1 px-3 py-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 text-gray-900"
                  placeholder="Ask me anything..."
                  aria-label="Message Input"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-full"
                  aria-label="Send Message"
                >
                  <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </motion.button>
              </form>
              <p className="text-center text-xs opacity-50 mt-2">
                Powered by xAI • {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;