import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ReqDoctorService from "../services/RequestDoctorService";

function RequestDoctor() {
  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationBackground: "",
    speciality: "",
  };

  const [doc, setDoctor] = useState (initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doc, [name]: value });
  };

  async function requestDoctor(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    ReqDoctorService.requestDoctor(doc)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={requestDoctor}>
        <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={doc.name}
              placeholder="Enter Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={doc.email}
              placeholder="Enter Email"
              onChange={handleInputChange}
            ></input>
          </div>
          
          
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={doc.username}
              placeholder="Enter Username"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={doc.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputDateOfBirth">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={doc.dateOfBirth}
              placeholder="dateOfBirth"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputHourlyRate">Hourly Rate</label>
            <input
              type="number"
              className="form-control"
              id="hourlyRate"
              name="hourlyRate"
              value={doc.hourlyRate}
              placeholder="Enter Hourly Rate"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputAffiliation">Affiliation</label>
            <input
              type="text"
              className="form-control"
              id="affiliation"
              name="affiliation"
              value={doc.affiliation}
              placeholder="Enter Affiliation"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEducationBackground">Education Background</label>
            <input
              type="text"
              className="form-control"
              id="educationBackground"
              name="educationBackground"
              value={doc.educationBackground}
              placeholder="Enter Education Background"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputSpeciality">Speciality</label>
            <input
              type="text"
              className="form-control"
              id="speciality"
              name="speciality"
              value={doc.speciality}
              placeholder="Enter Speciality"
              onChange={handleInputChange}
            ></input>
          </div>
          



          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </form>
      </header>
    </div>
  );
}

export default RequestDoctor;