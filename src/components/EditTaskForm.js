
import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, updateTask, cancelEdit }) => {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedTask.title.trim() || !editedTask.description.trim() || !editedTask.dueDate || !editedTask.priority) return;
    updateTask(editedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
      <textarea name="description" value={editedTask.description} onChange={handleChange} />
      <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleChange} />
      <select name="priority" value={editedTask.priority} onChange={handleChange}>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
    </form>
  );
};

export default EditTaskForm;
