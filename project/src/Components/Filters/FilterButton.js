// src/FilterButton.js

import React, { useState } from 'react';
import './FilterButton.css'; // Import the CSS file for styling
import Filtering from './Filtering'; // Import the Filtering component

function FilterButton({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFiltering = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-container">
      <div className="filter" onClick={toggleFiltering}>
        <i className="fas fa-filter"></i>
        <h2>Filters</h2>
      </div>
      {isOpen && <Filtering onFilterChange={onFilterChange} />} {/* Pass down the onFilterChange prop */}
      {isOpen && <div className="overlay" onClick={toggleFiltering}></div>} {/* Conditionally render the overlay */}
    </div>
  );
}

export default FilterButton;
