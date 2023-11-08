import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import DoctorService from "../../services/doctorService";


function SearchPatient() {
    console.log('7aga')
  const [results, setResults] = useState([]);
  const [name, setName] = useState('')
  const [spec, setSpec] = useState('')
  const handleNameChange = (event) => {
        setName(event.target.value);
      };
      const handleSpecChange = (event) => {
        setSpec(event.target.value);
      };
      console.log(name)
  const search = async (event) => {
    event.preventDefault();
    console.log('before response')

    //const speciality = event.target.speciality.value

    const response = await DoctorService.SearchPatientByName(name);
    console.log('after response')
    setResults(response.data);
    console.log(response.data)
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit= {search}>
          <div className="form-group">
            <label htmlFor="InputName">Patient name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              placeholder="enter patient name"
              value = {name}
              onChange={handleNameChange}
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
                key={result._id}  // Use the appropriate key (e.g., result._id)
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name: {result.Name}  {/* Update to result.Name */}
                  </h3>
                  <a href={`/doctor/searchPatientByName?name=${result.Name}`} rel="noopener noreferrer">
                    <button className="btn btn-primary">View Details</button>
                  </a>
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

export default SearchPatient;
