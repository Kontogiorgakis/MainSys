// src/Filtering.js

import React from 'react';
import './Filtering.css'; // Import the CSS file for styling

function Filtering({ onFilterChange }) {
  const handleFilterClick = (filterType) => {
    onFilterChange(filterType);
  };

  return (
    <div className="filtering">
      <div className="filter-option" onClick={() => handleFilterClick('all')}>Show All</div>
      <div className="filter-option" onClick={() => handleFilterClick('uncompleted')}>Show Uncompleted</div>
      <div className="filter-option" onClick={() => handleFilterClick('completed')}>Show Completed</div>
    </div>
  );
}

export default Filtering;
