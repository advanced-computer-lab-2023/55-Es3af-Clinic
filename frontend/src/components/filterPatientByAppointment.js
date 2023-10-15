import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import doctorService from "../services/doctorService";

function FilteredPatientsByAppointments() {
    const [results, setResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
  
    const search = async (event) => {
      event.preventDefault();
  
      const date = event.target.date.value;
      const doctorId = "6525afac114367999aba79df"; // Set the doctorId
  
      // Call the filterPatient function and pass doctorId and date as parameters
      try {
        const response = await doctorService.filterPatient(doctorId, date);
        setResults(response.data.data.patients);
        setSearchPerformed(true);
      } catch (error) {
        console.error("Error fetching filtered patients:", error.message);
      }
    }
  

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Appointments</label>
            <input
              type="date"
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
                      Patient: {result.patient.name}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Duration: {result.duration}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Status: {result.status}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Date: {result.date}
                    </h3>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h2>No Appointments found</h2>
            </div>
          )}
        </form>
      </header>
    </div>
  );
}

export default FilteredPatientsByAppointments;