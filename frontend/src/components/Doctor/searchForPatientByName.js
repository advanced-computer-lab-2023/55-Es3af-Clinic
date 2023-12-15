import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import DoctorService from "../../services/doctorService";
import Home from "../gohome";

function SearchPatient() {
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await DoctorService.SearchPatientByName(name);
      setResults(response.data.data.patients);
    } catch (error) {
      console.error("Error searching for patients:", error.message);
      // Add logic to handle and display the error
    } finally {
      setLoading(false);
      setSearched(true);
    }
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
          <p></p>

          {loading && <h2>Loading...</h2>}

          {!loading && searched && results.length > 0 ? (
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
                  <h3 className="card-title" style={{ color: "white" }}>
                    Email: {result.email}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date Of Birth: {formatDateOfBirth(result.dateOfBirth)}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender:{result.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Mobile:{result.mobile}
                  </h3>
                </div>
              </div>
            ))
          ) : !loading && searched && results.length === 0 ? (
            <div>
              <h2>No patients found</h2>
            </div>
          ) : null}
        </form>
      </header>
    </div>
  );
}

export default SearchPatient;
