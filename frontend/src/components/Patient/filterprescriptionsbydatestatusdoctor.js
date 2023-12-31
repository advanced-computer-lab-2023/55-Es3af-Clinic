import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../../services/patientService";
import Home from "../gohome";

function FilteredPrescriptionList() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const doctor = event.target.doctor.value;
    const status = event.target.statusDD.value;
    //const patientid = "654bed1dbe07a9603f5b4030";

    const response = await PatientService.FilteredPrescriptionList(
      date,
      doctor,
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
      <Home />
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
            <div>
                <label>Status: </label>
                <select id="statusDD">
                  <option value="" disabled selected hidden color="grey">
                    Status
                  </option>
                  <option value="filled">Filled</option>
                  <option value="unfilled">Unfilled</option>
                </select>
              </div>

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
                      Medicines:{" "}
                      {result.medicine.map((med, index) => (
                        <span key={index}>
                          {med.medID.Name}
                          {index < result.medicine.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Doctor: {result.doctor.name}
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
              <h2>No Prescriptions found</h2>
            </div>
          )}
        </form>
      </header>
    </div>
  );
}

export default FilteredPrescriptionList;
