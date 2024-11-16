import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [theme, setTheme] = useState("light");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskType, setTaskType] = useState("General");

  useEffect(() => {
    console.log("useEffect mounted");

    const storedTasks = localStorage.getItem("tasks");
    console.log("Stored tasks raw:", storedTasks); // Log raw value from localStorage

    // Check if the stored tasks are null or a valid JSON string
    if (storedTasks) {
        try {
            const parsedTasks = JSON.parse(storedTasks);
            console.log("Parsed tasks:", parsedTasks); // Log parsed tasks
            setTasks(parsedTasks);
        } catch (error) {
            console.error("Error parsing stored tasks:", error);
        }
    } else {
        console.log("No tasks found in localStorage");
        setTasks([]); // No tasks in localStorage, initialize with empty array
    }

    const storedTheme = localStorage.getItem("theme") || "light";
    console.log("Stored theme:", storedTheme);
    setTheme(storedTheme);
}, []); // Empty dependency array to run only once on mount
useEffect(() => {
  console.log("Saving tasks to localStorage:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Saving theme to localStorage:", theme);
  localStorage.setItem("theme", theme);
}, [tasks, theme]); // Runs whenever tasks or theme change

  // Add a new task
  const addTask = (title, description = "", priority = "Medium", deadline = null, taskType = "General") => {
    if (!title.trim()) return; // Prevent adding empty tasks
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      taskType,
      dateAdded: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Update an existing task
  const updateTask = (id, title, description, priority, deadline, taskType) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title, description, priority, deadline, taskType }
          : task
      )
    );
    setIsEditing(false);
    setEditingTaskId(null);
    resetForm();
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Sort tasks based on selected criteria
  const sortTasks = (criteria) => {
    const sortedTasks = [...tasks];
    
    // Define priority order
    const priorityOrder = { low: 1, medium: 2, high: 3 };
  
    switch (criteria) {
      case "priority":
        sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case "completion":
        sortedTasks.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
      case "date":
        sortedTasks.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case "deadline":
        sortedTasks.sort((a, b) =>
          a.deadline && b.deadline
            ? new Date(a.deadline) - new Date(b.deadline)
            : a.deadline
            ? -1
            : 1
        );
        break;
      default:
        break;
    }
    setTasks(sortedTasks);
  };

  useEffect(() => {
    if (sortCriteria) {
      sortTasks(sortCriteria); // Trigger sort when criteria changes
    }
  }, [sortCriteria]);

  // Filter tasks by search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset form after adding or updating a task
  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("Medium");
    setTaskDeadline("");
    setTaskType("General");
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle add or update task
  const handleAddOrUpdateTask = () => {
    if (isEditing) {
      updateTask(editingTaskId, taskTitle, taskDescription, taskPriority, taskDeadline, taskType);
    } else {
      addTask(taskTitle, taskDescription, taskPriority, taskDeadline, taskType);
      resetForm(); // Clear input fields after adding the task
    }
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Task Manager</h1>

      <div className="search-sort-row">
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "🌞"}
          </button>
        </div>

        <div className="task-search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="task-sort">
          <select
            onChange={(e) => setSortCriteria(e.target.value)}
            value={sortCriteria}
          >
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="completion">Completion</option>
            <option value="date">Date Added</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
      </div>

      <div className="task-input">
        <div className="row">
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <input
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Task Description (Optional)"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <div className="row">
          <button onClick={handleAddOrUpdateTask}>
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
            </div>
            <div className="details">
              <div className="task-details">
                <span>{task.title}</span>
                {task.description && <small>{task.description}</small>}
              </div>
              <div className="task-meta">
                <span>
                  ({[task.priority, task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A", task.taskType]
                    .filter(Boolean) // Ensure no empty or null values are included
                    .join(", ")})
                </span>
              </div>
            </div>
            <div className="check">
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                <i className="fas fa-trash-alt"></i> {/* Trash icon for Delete */}
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  setIsEditing(true);
                  setEditingTaskId(task.id);
                  setTaskTitle(task.title);
                  setTaskDescription(task.description || "");
                  setTaskPriority(task.priority);
                  setTaskDeadline(task.deadline ? task.deadline.split("T")[0] : "");
                  setTaskType(task.taskType);
                }}
              >
                <i className="fas fa-edit"></i> {/* Edit pencil icon */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
