function TaskCard({ task, onDelete }) {
  const status = task.status || "pending";
  const priority = task.priority || "medium";

  const statusClass =
    status === "completed" ? "badge completed" : "badge pending";

  const priorityClass = `priority ${priority}`;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span className={statusClass}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <p>
        <strong>Priority:</strong>{" "}
        <span className={priorityClass}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </p>

      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      )}
    </div>
  );
}

export default TaskCard;