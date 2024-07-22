import React, { useState, useEffect, useRef } from 'react';
import './EditTask.css'; // Import the CSS file for styling

function EditTask({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
    }
  }, [description]);

  const handleSave = () => {
    onSave({ ...task, title, description });
  };

  return (
    <div className="edit-task">
      <h2>Edit Task</h2>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>
      <div className="form-group">
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="description-textarea"
        />
      </div>
      <button className="create-button" onClick={handleSave}>Save</button>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditTask;
