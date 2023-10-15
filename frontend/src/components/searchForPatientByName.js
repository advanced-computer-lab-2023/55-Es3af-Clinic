import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import doctorService from "../services/doctorService";

function SearchPatientByName() {
  const [results, setResults] = useState([]);

  const search = async (event) => {
    event.preventDefault();

    const query = event.target.Name.value;

    const response = await doctorService.SearchPatientByName(query)
  

    setResults(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Patient name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              placeholder="enter patient name"
              
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p>results</p>
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
                  <h3 className="card-title" style={{ color: "white" }}>
                   Email: {result.email}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   gender: {result.gender}
                  </h3>
                  
                  </div>

              </div>
            );
          })
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

export default SearchPatientByName;
