import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";


const MyPatientList = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    DoctorService.getAllMyPatients()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.data.patients)) {
          setPatients(response.data.data.patients);
        } else {
          console.log("Data is not an array:", response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const viewDets = (patient) => {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = `
      <div>
        <div className="App-header">
          <div
            className="card"
            key=${patient._id}
            style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
          >
            <div className="card-body">
              <h3 className="card-title" style={{ color: "white" }}>
                Name: ${patient.name}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Email: ${patient.email}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Date Of Birth: ${formatDateOfBirth(patient.dateOfBirth)}
              </h3> 
              <h3 className="card-title" style={{ color: "white" }}>
                Gender: ${patient.gender}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Mobile: ${patient.mobile}
              </h3>
              ${
                patient.emergencyContact
                  ? `
                    <h3 className="card-title" style={{ color: "white" }}>
                      Emergency Contact: ${patient.emergencyContactName} - ${patient.emergencyContactMobile}
                    </h3>
                  `
                  : ''
              }
              <h3 className="card-title" style={{ color: "white" }}>
                Package: ${patient.package}
              </h3> 
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const viewMedicalHistory = (patientId) => {
    console.log(`View Medical History for patient with ID: ${patientId}`);
  };

  return (
    <div>
      <div className="App-header" id="contentContainer">
        {patients.length > 0 ? (
          patients.map((patient) => {
            return (
              <div
                className="card"
                key={patient._id}
                style={{ width: 550, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name: {patient.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender: {patient.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Mobile: {patient.mobile}
                  </h3>
                  <button
                    style={{ width: 200, height: 50, backgroundColor: "#2a5923" }}
                    id="updateButton"
                    onClick={() => viewDets(patient)}
                  >
                    View Details
                  </button>
                  <button
                    style={{ width: 300, height: 50, backgroundColor: "#2a5923" }}
                    id="viewMedicalHistoryButton"
                    onClick={() => viewMedicalHistory(patient._id)}
                  >
                    View Medical History
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Patients</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPatientList;