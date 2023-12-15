import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import patientService from "../../services/patientService";
import { Link } from "react-router-dom";
import Home from "../gohome";

function FilterDoctors() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const search = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const date = event.target.date.value;
      const speciality = event.target.speciality.value;
      const response = await patientService.FilterDoctors(date, speciality);
      setResults(response.data);
      setSearchPerformed(true);
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
              <label htmlFor="InputUsername">Doctors</label>
              <input
                type="string"
                className="form-control"
                id="speciality"
                name="speciality"
                placeholder="enter speciality"
              />

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
            {searchPerformed && <p>results</p>}
            {(Array.isArray(results) && results.length > 0) ||
            !searchPerformed ? (
              results.map((result) => {
                return (
                  <div
                    className="card"
                    key={result._id}
                    style={{
                      width: 450,
                      backgroundColor: "#282c34",
                      margin: 10,
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        Doctor: {result.name}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Price: {result.price}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Speciality: {result.speciality}
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
                );
              })
            ) : (
              <div>
                <h2>No Doctors found</h2>
              </div>
            )}
          </form>
        </header>
      )}
    </div>
  );
}
export default FilterDoctors;
