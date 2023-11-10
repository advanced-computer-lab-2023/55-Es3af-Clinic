import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import patientService from "../../services/patientService";
import { Link } from "react-router-dom";
import React from 'react';
import useDoctorSearch from './searchDoctors';

function FilterDoctors() {
  const { results, searchPerformed, searchDoctors } = useDoctorSearch();

  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const speciality = event.target.speciality.value;
    const patientid = '652b2da81a7433f37b218610';

    // Call the searchDoctors function from the custom hook
    await searchDoctors(patientid, date, speciality);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Doctors</label>
            <input
            type="string"
            className="form-control"
            id="speciality"
            name="speciality"
            placeholder="enter speciality" />

            <input
              type="datetime"
              className="form-control"
              id="date"
              name="date"
              placeholder="enter date"
            />

          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p>results</p>
          {(Array.isArray(results) && results.length > 0) || !searchPerformed ? (
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
                   Hourly Rate: {result.hourlyRate}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                  Affiliation: {result.affiliation}
                  </h3>
                  <button className = "btn btn-primary">
                      <Link to={`/patient/doctorInfo/${result.id}`} style={{ color: 'white', textDecoration: 'underline' }}>View Details</Link>
                    </button>
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
export default FilterDoctors;