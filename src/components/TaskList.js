import React from 'react';

const TaskList = ({ tasks, deleteTask, setSelectedTask }) => {
  return (
    <div className="task-list-container">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <button onClick={() => setSelectedTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
