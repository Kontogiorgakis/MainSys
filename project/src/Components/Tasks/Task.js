import React, { useState } from 'react';
import './Task.css'; // Import the CSS file for styling
import EditTask from './EditTasks/EditTask';

function Task({ task, addTask, onSave, onDelete }) {
  const [description, setDescription] = useState(task.description || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (!task.isNew) {
      setIsEditing(true);
    }
  };

  const handleSave = (updatedTask) => {
    onSave(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      onDelete(task.id);
    }
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    onSave({ ...task, completed: !task.completed });
  };

  return (
    <>
      <div className={`task ${task.isNew ? 'new-task' : ''}`} onClick={task.isNew ? addTask : handleEditClick}>
        {task.isNew ? (
          <div className="new-task-frame">
            <i className="fas fa-plus add-icon"></i>
            <h2 className="createText">Create New Task</h2>
          </div>
        ) : (
          <>
            <div className="values">
              <i
                className="fas fa-check check-icon"
                style={{ color: task.completed ? 'green' : 'black' }}
                onClick={handleToggleComplete}
              ></i>
              <i className="fas fa-trash bin-icon" onClick={handleDelete}></i>
            </div>
            <div className="task-header">
              <h2 className="titleTask">{task.title}</h2>
              <div className="descriptionTask">{description}</div>
            </div>
          </>
        )}
      </div>
      {isEditing && <EditTask task={task} onSave={handleSave} onCancel={handleCancel} />}
    </>
  );
}

export default Task;
