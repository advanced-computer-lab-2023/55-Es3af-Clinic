import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../services/patientService";

function FilteredPrescriptionList() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const doctor = event.target.doctor.value;
    const status = event.target.status.value;
    const patientid = "652b2d531a7433f37b21860e";
    

    const response = await PatientService.FilteredPrescriptionList(
      patientid,
      date,
      doctor,
      status
    );

    setResults(response.data);
    setSearchPerformed(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Prescriptions</label>
            <input
              type="string"
              className="form-control"
              id="doctor"
              name="doctor"
              placeholder="enter doctor name"
              
            />
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
                      Medicine: {result.medicine}
                    </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Doctor: {result.doctor.name}
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
            <h2>No Prescriptions found</h2>
          </div>
        )}
          
        </form>
      </header>
    </div>
  );
}

export default FilteredPrescriptionList;
