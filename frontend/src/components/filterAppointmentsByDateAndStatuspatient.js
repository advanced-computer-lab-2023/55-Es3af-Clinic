import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import patientService from "../services/patientService";

function FilteredAppointmentsList() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value
    const status = event.target.status.value;
    const patientid = "652b2d531a7433f37b21860e";
    

    const response = await patientService.FilteredAppointmentsList(
      patientid,
      date,
      status
    );

    setResults(response.data);
    setSearchPerformed(true);
  };
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Appointments</label>
            <input
            type="string"
            className="form-control"
            id="status"
            name="status"
            placeholder="enter status" />

            <input
            type="string"
            className="form-control"
            id="date"
            name="date"
            placeholder="enter date" />

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
                   Doctor: {result.doctor.name}
                </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Duration: {result.duration}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Status: {result.status}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Date: {formatDateOfBirth(result.date)}
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
export default FilteredAppointmentsList;