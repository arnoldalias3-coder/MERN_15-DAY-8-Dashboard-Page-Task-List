import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await axiosInstance.post("/tasks", {
        title,
        description,
        status,
        priority,
        dueDate,
      });

      navigate("/tasks");
    } catch (error) {
      console.log("Add task error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="form-page">
      <h1>Add Task</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleAddTask} className="form-box">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;