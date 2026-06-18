import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import DashboardCard from "../components/DashboardCard";
import TaskCard from "../components/TaskCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function Dashboard() {
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
      console.log("Dashboard error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="summary-container">
        <DashboardCard title="Total Tasks" count={totalTasks} />
        <DashboardCard title="Completed" count={completedTasks} />
        <DashboardCard title="Pending" count={pendingTasks} />
      </div>

      <h2>Recent Tasks</h2>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="task-container">
          {tasks.slice(0, 3).map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;