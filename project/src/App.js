import React, { useState, useEffect } from 'react';
import './App.css';

/* Components */
import FilterButton from './Components/Filters/FilterButton'; // Import the FilterButton component
import Task from './Components/Tasks/Task'; // Import the Task component
import CreateTask from './Components/Tasks/CreateTasks/CreateTask'; // Import the CreateTask component

import vectorImage from './Assets/Vector.png'; // Adjust the path according to your project structure

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [filter, setFilter] = useState('all');

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('storedTasks:', storedTasks);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        console.log('Loaded tasks from local storage:', parsedTasks);
        // Ensure task objects are consistent
        const tasksWithDefaults = parsedTasks.map(task => ({
          ...task,
          completed: task.completed || false // Default value for completed if not present
        }));
        setTasks(tasksWithDefaults);
        console.log('Tasks after setting state:', tasksWithDefaults);
      } catch (error) {
        console.error('Error parsing tasks from local storage:', error);
      }
    } else {
      console.log('No tasks found in local storage.');
    }
  }, []); // Empty dependency array means this runs once on mount

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    try {
      console.log('Saving tasks to local storage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Tasks saved to local storage:', tasks);
    } catch (error) {
      console.error('Error saving tasks to local storage:', error);
    }
  }, [tasks]); // Dependency on tasks state

  // Handle adding a new task
  const addTask = () => {
    setShowCreateTask(true);
  };

  // Handle creating a new task
  const createTask = (title, description) => {
    const newTask = { id: Date.now(), title, isNew: false, time: '', description, completed: false };
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      console.log('Tasks after adding new task:', updatedTasks);
      return updatedTasks;
    });
    setShowCreateTask(false);
  };

  // Handle updating an existing task
  const updateTask = (updatedTask) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      console.log('Updated tasks:', updatedTasks);
      return updatedTasks;
    });
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    setTasks(prevTasks => {
      const filteredTasks = prevTasks.filter(task => task.id !== id);
      console.log('Tasks after deletion:', filteredTasks);
      return filteredTasks;
    });
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true; // Default case
  });

  // Check the tasks before rendering
  console.log('Rendering App with tasks:', tasks);
  console.log('Filtered tasks:', filteredTasks);

  return (
    <div className="App">
      <header className="App-header">
        <div className="image-container">
          <img src={vectorImage} alt="Vector" className="background-image" />
          <div className="overlay-text">
            <h1>Tasky</h1>
            <p>Master Your Tasks with Ease</p>
          </div>
        </div>
      </header>
      <FilterButton onFilterChange={handleFilterChange} /> {/* Pass the handleFilterChange function */}
      <div className='task-container'>
        {filteredTasks.length === 0 && <p>No tasks available. Add a new task to get started!</p>}
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} onSave={updateTask} onDelete={deleteTask} />
        ))}
        <Task task={{ isNew: true }} addTask={addTask} /> {/* Always render "Add Task" button last */}
      </div>
      {showCreateTask && <CreateTask createTask={createTask} setShowCreateTask={setShowCreateTask} />}
    </div>
  );
}

export default App;
