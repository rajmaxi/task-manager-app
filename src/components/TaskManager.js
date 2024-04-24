
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null); 
  };


  const cancelEdit = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      {selectedTask ? (
        <EditTaskForm task={selectedTask} updateTask={editTask} cancelEdit={cancelEdit} />
      ) : (
        <div>
          <AddTaskForm addTask={addTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} setSelectedTask={setSelectedTask} />
        </div>
      )}
    </div>
  );
};

export default TaskManager;
