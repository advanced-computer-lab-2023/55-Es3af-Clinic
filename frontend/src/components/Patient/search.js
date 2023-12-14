import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../../services/patientService";
import DoctorInfo from "./doctorInfo";
import { Link } from "react-router-dom";
import Home from "../gohome";

function SearchDoctor() {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [name, setName] = useState("");
  const [spec, setSpec] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSpecChange = (event) => {
    setSpec(event.target.value);
  };
  console.log(name);
  const search = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const response = await PatientService.search(name, spec);
      if (Array.isArray(response.data)) {
        setResults(response.data);
        setSearched(true);
      } else {
        setResults([]);
        setSearched(true);
        console.log("Data is not an array:", response.data);
      }
    } catch (error) {
      console.error(error);
      setResults("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Home />
      {loading ? (
        <div className="preloader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>

            <div className="indicator">
              <svg width="16px" height="12px">
                <polyline
                  id="back"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
                <polyline
                  id="front"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
              </svg>
            </div>
          </div>{" "}
        </div>
      ) : (
        <header className="App-header">
          <form className="App-header" onSubmit={search}>
            <div className="form-group">
              <label htmlFor="InputName">Doctor name</label>
              <input
                type="string"
                className="form-control"
                id="Name"
                name="Name"
                placeholder="enter doctor name"
                value={name}
                onChange={handleNameChange}
              />
              <label htmlFor="InputSpec">Speciality</label>
              <input
                type="string"
                className="form-control"
                id="spec"
                name="spec"
                placeholder="enter speciality"
                value={spec}
                onChange={handleSpecChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {searched && <p>results</p>}
            {results.length > 0
              ? results.map((result) => (
                  <div
                    className="card"
                    key={result.id}
                    style={{
                      width: 450,
                      backgroundColor: "#282c34",
                      margin: 10,
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        name: {result.name}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        price: {result.price}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        speciality: {result.speciality}
                      </h3>
                      <button className="btn btn-primary">
                        <Link
                          to={`/patient/doctorInfo/${result.id}`}
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                ))
              : searched && (
                  <div>
                    <h2>No doctors found</h2>
                  </div>
                )}
          </form>
        </header>
      )}
    </div>
  );
}

export default SearchDoctor;
