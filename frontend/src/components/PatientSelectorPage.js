// SelectorPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import adminService from '../services/adminService';
import Home from './gohome';
const SelectorPage = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('here')
    // Fetch options from your API
    adminService.listUsers()
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRedirect = () => {
    if (selectedOption) {
      // Redirect to /chat with the selected option's Id as a query parameter
      navigate(`/chat?id=${encodeURIComponent(selectedOption)}&type=Doctor`);
    }
  };

  return (
    <div>
      <Home />
      <h1>Selector Page</h1>
      <select onChange={handleOptionChange} value={selectedOption}>
        <option value="" disabled>Select an option</option>
        {options.map(option => (
          <option key={option._id} value={`${option._id}_${option.name}`}>{option.name}</option>
        ))}
      </select>
      <button onClick={handleRedirect}>Go to Chat</button>
    </div>
  );
};

export default SelectorPage;
