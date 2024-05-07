import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const debouncedHandleSearchChange = debounce(handleSearchChange, 300);
    return () => debouncedHandleSearchChange.cancel();
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const cancelEdit = () => {
    setSelectedTask(null);
  };

  const handleSearchChange = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setSearchInput(searchInput);
    
    if (searchInput.trim() !== "") {
      const filteredData = tasks.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchInput)
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(tasks);
    }
  };

  return (
    <div>
      {selectedTask ? (
        <EditTaskForm
          task={selectedTask}
          updateTask={editTask}
          cancelEdit={cancelEdit}
        />
      ) : (
        <div>
          {tasks.length > 0 && (
            <input
              className="mb-20"
              type="search"
              placeholder="Search task"
              onChange={handleSearchChange}
            />
          )}
          {searchInput.length > 1 ? (
                <TaskList
                  tasks={filteredResults}
                  deleteTask={deleteTask}
                  setSelectedTask={setSelectedTask}
                />
          ) : (
            <>
              <AddTaskForm addTask={addTask} />
              <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                setSelectedTask={setSelectedTask}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
