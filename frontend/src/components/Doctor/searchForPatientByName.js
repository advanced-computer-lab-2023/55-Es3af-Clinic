import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import DoctorService from "../../services/doctorService";

function SearchPatient() {
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const doctorId = "6525afac114367999aba79df";

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    try {
      const response = await DoctorService.SearchPatientByName(name, doctorId);
      setResults(response.data.data.patients);
    } catch (error) {
      console.error("Error searching for patients:", error.message);
      // Add logic to handle and display the error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={(e) => search(e)}>
          <div className="form-group">
            <label htmlFor="InputName">Patient name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              name="Name"
              placeholder="Enter patient name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p>Results</p>
          {results.length > 0 ? (
            results.map((result) => (
             <div
                className="card"
                key={result._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
            >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name: {result.name}
                  </h3>
                  <a
                    href={`/doctor/searchPatientByName?name=${result.name}`}
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">View Details</button>
                  </a>
                </div>
              </div>
        ))
          ) : (
            <div>
              <h2>No patients found</h2>
            </div>
          )}

        </form>
      </header>
    </div>
  );
}

export default SearchPatient;
