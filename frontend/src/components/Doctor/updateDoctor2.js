import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import DoctorService from "../../services/doctorService";
import Home from "../gohome";

function EditDoctor() {
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

  async function update(e) {
    e.preventDefault();
    try {
      console.log("Updating doctor with data:", doctor);
      await DoctorService.updateDoctor(doctor);
      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating doctor:", error.message);
    }
  }

  return (
    <div className="App-header" id="contentContainer">
      <Home />
      <div className="card" style={{ width: 550, backgroundColor: "#282c34", margin: 10 }}>
        <div className="card-body">
          <h2 style={{ color: "white" }}>Update Doctor</h2>
          <form onSubmit={update}>
            <div className="form-group">
              <label style={{ color: "white" }}>Email:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={doctor.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "white" }}>Hourly Rate:</label>
              <input
                type="number"
                className="form-control"
                name="hourlyRate"
                value={doctor.hourlyRate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "white" }}>Affiliation:</label>
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
          {isUpdated && (
            <div className="alert alert-success" style={{ color: "white" }}>
              Doctor updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditDoctor;
