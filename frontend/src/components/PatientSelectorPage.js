// SelectorPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./gohome";
import doctorService from "../services/doctorService";
const PatientSelectorPage = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    doctorService
      .getAllMyPatients()
      .then((response) => {
        console.log(response.data.data);
        setOptions(response.data.data.patients);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRedirect = () => {
    if (selectedOption) {
      // Redirect to /chat with the selected option's Id as a query parameter
      navigate(`/doctor/doctorChat?id=${encodeURIComponent(selectedOption)}`);
    }
  };

  return (
    <div>
      <Home />
      {loading ? (
        <div className="preloader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>

            <div className="indicator">
              <svg width="16px" height="12px">
                <polyline
                  id="back"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
                <polyline
                  id="front"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="App-header">
          <h1>Selector Page</h1>
          <select onChange={handleOptionChange} value={selectedOption}>
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option._id} value={`${option._id}`}>
                {option.name}
              </option>
            ))}
          </select>
          <button onClick={handleRedirect}>Go to Chat</button>
        </div>
      )}
    </div>
  );
};

export default PatientSelectorPage;
