import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.description.trim() || !task.dueDate || !task.priority) return;
    addTask(task);
    setTask({ title: '', description: '', dueDate: '', priority: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
