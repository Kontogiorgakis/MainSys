import React, { useState } from 'react';
import './CreateTask.css'; // Import the CSS file for styling

function CreateTask({ createTask, setShowCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title && description) {
      createTask(title, description);
    }
  };

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <button onClick={handleSubmit} className="create-button">Create</button>
      <button onClick={() => setShowCreateTask(false)} className="cancel-button">Cancel</button>
    </div>
  );
}

export default CreateTask;
