import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaTrashAlt,
  FaSearch,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");
  const [search, setSearch] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (!newTask.trim() || !deadline) return alert("Please fill all fields!");
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      deadline,
      category,
      priority,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
    setDeadline("");
    setCategory("Work");
    setPriority("Low");
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) =>
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

  // Delete a task
  const deleteTask = (taskId) => setTasks(tasks.filter((task) => task.id !== taskId));

  // Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-100 via-purple-100 to-indigo-100 p-6 pt-24">
        {/* Header Section */}
        <div className="container mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
            Task Manager
          </h1>
        </div>

        {/* Task Input Section */}
        <div className="container mx-auto bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Enter task name..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-all"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-all"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-all"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-all"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <FaPlusCircle /> Add Task
          </button>
        </div>

        {/* Task Search */}
        <div className="container mx-auto mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-all"
          />
        </div>

        {/* Task List */}
        <ul className="container mx-auto space-y-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-600">No tasks found. Add a new task!</p>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md ${
                  task.completed
                    ? "bg-green-100 text-gray-700 line-through opacity-70"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-lg font-medium">{task.text}</span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaCalendarAlt /> {task.deadline}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.category === "Work"
                        ? "bg-blue-100 text-blue-800"
                        : task.category === "Personal"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <FaTag /> {task.category}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.priority === "Low"
                        ? "bg-green-100 text-green-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  <FaTrashAlt size={20} />
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
};

export default TaskManagement;