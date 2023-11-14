import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import patientService from "../../services/patientService";
import React from 'react';
import { useNavigate } from "react-router-dom";


function BookAnAppointment() {

  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  // const handleBookAppointment = async (doctorId) => {
  //   try {
  //     await patientService.AvailableAppointments(doctorId);
  //     console.log("Booking successful");
  //   } catch (error) {
  //     console.error("Error booking appointment:", error);
  //     // Handle the error as needed
  //   }
  // };

  // useEffect(() => {
  //   let timeout;
  //   if (searchPerformed) {
  //     timeout = setTimeout(() => {
  //       console.log("Navigating...");
  //       navigate('/patient/viewAvailableAppointments');
  //     }, 10000); // 10000 milliseconds = 10 seconds
  //   }

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [searchPerformed, navigate]);


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
                  type="date"
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
                      
                      <a
                    href={`/patient/viewAvailableAppointments/${result.id}`}
                    className="btn btn-primary"
                    
                  >
                    Book This Doctor
                  </a>
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