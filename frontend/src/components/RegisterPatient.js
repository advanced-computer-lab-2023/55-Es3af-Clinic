import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import RegisterPatientService from "../services/RegisterPatientService";

function RegisterPatient() {
  const initialUserState = {
    name: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobile: "01XXXXXXXXX",
    emergencyContactName: "",
    emergencyContactMobile: "",
  };

  const [patient, setPatient] = useState (initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  async function registerPatient(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    RegisterPatientService.registerPatient(patient)
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
        <form className="App-header" onSubmit={registerPatient}>
        <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={patient.name}
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
              value={patient.email}
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
              value={patient.username}
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
              value={patient.password}
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
              value={patient.dateOfBirth}
              placeholder="dateOfBirth"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputGender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              value={patient.gender}
              placeholder="Enter Gender"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputMobile">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={patient.number}
              placeholder="Enter Mobile Number"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputEmergencyContactName">Emergency Contact Name</label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactName"
              name="emergencyContactName"
              value={patient.emergencyContactName}
              placeholder="Enter Emergency Contact Name"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputEmergencyContactMobile">Emergency Contact Mobile</label>
            <input
              type="tel"
              className="form-control"
              id="emergencyContactMobile"
              name="emergencyContactMobile"
              value={patient.emergencyContactMobile}
              placeholder="Enter Emergency Contact Mobile"
              onChange={handleInputChange}
            ></input>
          </div>



          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </header>
    </div>
  );
}

export default RegisterPatient;