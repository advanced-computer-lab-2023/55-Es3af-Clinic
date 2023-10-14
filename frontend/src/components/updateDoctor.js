import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import DoctorService from "../services/doctorService";

function UpdateDoctor(doctorId) {
  const initialDoctorState = {
    email: "",
    hourlyRate: 0,
    affiliation: "",
  };

  const [doctor, setDoctor] = useState(initialDoctorState);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await DoctorService.updateDoctor("6525afac114367999aba79df", doctor);
      console.log("Doctor updated successfully:", response.data);
      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating doctor:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Update Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={doctor.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Hourly Rate:</label>
          <input
            type="number"
            className="form-control"
            name="hourlyRate"
            value={doctor.hourlyRate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Affiliation:</label>
          <input
            type="text"
            className="form-control"
            name="affiliation"
            value={doctor.affiliation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      {isUpdated && <div className="alert alert-success">Doctor updated successfully!</div>}
    </div>
  );
}

export default UpdateDoctor;
