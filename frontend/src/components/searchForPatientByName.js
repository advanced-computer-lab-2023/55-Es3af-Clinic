import React, { useState } from 'react';
import DoctorService from '../services/doctorService';

const SearchPatientByName = () => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");  // Add query state
  
    const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const response = await DoctorService.searchPatientByName(query);
        console.log('Response:', response);
        if (response && response.data && response.data.patients) {
          setResults(response.data.patients);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error searching patients:', error.message);
        setResults([]);
      }
    };
  
    const handleInputChange = (event) => {
      setQuery(event.target.value);  // Update the query state
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <form className="App-header" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="InputUsername">Patient Name</label>
              <input
                type="string"
                className="form-control"
                id="Name"
                name="Name"
                placeholder="Enter Patient Name"
                value={query}  // Update input value to use the query state
                onChange={handleInputChange}  // Update input onChange to update the query state
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <p>Results</p>
            {results.length > 0 ? (
              results.map((result) => {
                return (
                  <div
                    className="card"
                    key={result._id}
                    style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        Name: {result.name}
                      </h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No Patients</h2>
              </div>
            )}
          </form>
        </header>
      </div>
    );
  };
  
  export default SearchPatientByName;
  