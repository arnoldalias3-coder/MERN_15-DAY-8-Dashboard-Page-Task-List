import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import TaskCard from "../components/TaskCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/tasks");

      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data.tasks || [];

      setTasks(taskData);
    } catch (error) {
      console.log("Tasks error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/tasks/${taskId}`);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading tasks..." />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="page">
      <h1>Tasks</h1>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;