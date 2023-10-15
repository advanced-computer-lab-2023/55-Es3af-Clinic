import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../services/doctorService";

const MyPatientList = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    DoctorService.getAllMyPatients("doc1")
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

  return (
    <div>
      <div className="App-header">
        {patients.length > 0 ? (
          patients.map((patient) => {
            return (
              <div
                className="card"
                key={patient._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name: {patient.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Email: {patient.email}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date Of Birth: {patient.dateOfBirth}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender: {patient.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Mobile: {patient.mobile}
                  </h3>
                  {patient.emergencyContact && (
                    <h3 className="card-title" style={{ color: "white" }}>
                      Emergency Contact: {patient.emergencyContactName} - {patient.emergencyContactMobile}
                    </h3>
                  )}
                  <h3 className="card-title" style={{ color: "white" }}>
                    Package: {patient.package}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Health Records: {patient.healthRecords}
                  </h3>
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
