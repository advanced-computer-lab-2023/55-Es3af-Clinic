import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PatientService from "../../services/patientService";
import DoctorInfo from "./doctorInfo";
import { Link } from "react-router-dom";
import Home from "../gohome";


function SearchDoctor() {
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

    const response = await PatientService.search(name, spec);
    console.log('after response')
    //setResults(response.data);
    if (Array.isArray(response.data)) {
        setResults(response.data);
    }
    else {
        // Handle the case where response.data is not an array
        console.log("Data is not an array:", response.data);
      }
    
    console.log(response.data)
  };

  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <form className="App-header" onSubmit= {search}>
          <div className="form-group">
            <label htmlFor="InputName">Doctor name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              placeholder="enter doctor name"
              value = {name}
              onChange={handleNameChange}
            />
            <label htmlFor="InputSpec">Speciality</label>
            <input
              type="string"
              className="form-control"
              id="spec"
              name="spec"
              placeholder="enter speciality"
              value = {spec}
              onChange={handleSpecChange}
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
                key={""}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
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
                    <button className = "btn btn-primary">
                      <Link to={`/patient/doctorInfo/${result.id}`} style={{ color: 'white', textDecoration: 'underline' }}>View Details</Link>
                    </button>
                  </div>

              </div>
            );
          })
        ) : (
          <div>
            <h2>No doctors found</h2>
          </div>
        )}
        </form>
      </header>
    </div>
  );
}

export default SearchDoctor;
