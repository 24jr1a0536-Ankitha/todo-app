import React, { useEffect, useState } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (!input.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, text: input } : t
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), text: input, completed: false },
      ]);
    }

    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addOrUpdateTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? "done" : ""}>
                {task.text}
              </span>
            </div>

            <div className="actions">
              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
