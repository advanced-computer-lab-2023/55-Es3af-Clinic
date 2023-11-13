import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import patientService from "../../services/patientService";
import React from 'react';
import { useHistory } from 'react-router-dom';

function BookAnAppointment() {

  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
    const search = async (event) => {
      event.preventDefault();
  
      const date = event.target.date.value;
      const speciality = event.target.speciality.value;
  
      const response = await patientService.FilterDoctors(date, speciality);
      // Do something with the response if needed
  
      // Redirect to the FilterDoctors component
      setResults(response.data);
      console.log(response)
      setSearchPerformed(true);
    };
  
    return (
      
        <div className="App">
          <header className="App-header">
            <form className="App-header" onSubmit={search}>
              <div className="form-group">
                <label htmlFor="InputUsername">Choose by speciality</label>
                <input
                type="string"
                className="form-control"
                id="speciality"
                name="speciality"
                placeholder="enter speciality" />
                <label htmlFor="InputUsername">Choose by date</label>
                <input
                  type="datetime"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="enter date"
                />
    
              </div>
              <a href={`/patient/searchBySpecDate/`} rel="noopener noreferrer"></a>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <p>results</p>
              {results.length > 0 || !searchPerformed ? (
              results.map((result) => {
                return (
                  <div
                    className="card"
                    key={result._id}
                    style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                  >
                    <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                       Doctor: {result.name}
                    </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                       Hourly Rate: {result.price}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                      Speciality: {result.speciality}
                      </h3>
                      
                  <button className = "btn btn-primary"
                                    >Book This Doctor</button>
                      </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No Doctors found</h2>
              </div>
            )}
              
            </form>
          </header>
        </div>
      );
    }
 
export default BookAnAppointment;