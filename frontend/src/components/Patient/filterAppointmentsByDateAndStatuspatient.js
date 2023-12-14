import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import patientService from "../../services/patientService";
import Home from "../gohome";

function FilteredAppointmentsList() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (event) => {
    event.preventDefault();
    setLoading(true);
    const date = event.target.date.value;
    const status = event.target.statusDD.value;
    try {
      const response = await patientService.FilteredAppointmentsList(
        date,
        status
      );
      setResults(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time1) => {
    const time = new Date(time1);
    const hour = time.getHours();
    const minute = time.getMinutes();
    return `${hour}:${minute}`;
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
              <label htmlFor="InputUsername">Appointments</label>
              <div>
                <label>Status: </label>
                <select id="statusDD">
                  <option value="" disabled selected hidden color="grey">
                    Status
                  </option>
                  <option value="done">Done</option>
                  <option value="canceled">Canceled</option>
                  <option value="currently working">Currently Working</option>
                  <option value="pending">Pending</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>
              <div>
                <label>Date: </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="enter date"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {searchPerformed && <p>Results</p>}
            {results.length > 0 || !searchPerformed ? (
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
                        Duration: {result.duration}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Status: {result.status}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Date: {formatDateOfBirth(result.date)}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Time: {formatTime(result.date)}
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
      )}
    </div>
  );
}
export default FilteredAppointmentsList;
