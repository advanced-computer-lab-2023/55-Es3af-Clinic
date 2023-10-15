import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../services/doctorService";

function SelectPatientList() {
  const [patients, setPatients] = useState([]);
  //const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    // Fetch the list of patients
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await DoctorService.getAllPatients(); 
      setPatients(response.data.data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  const selectPatient = (event) => {
    // Access the user's ID from the event's target dataset
    const userId = event.currentTarget.dataset.userId;
  
    // Check if userId is available
    if (userId) {
      DoctorService.selectPatient("6525afac114367999aba79df", userId)
        .then((response) => {
          console.log(response.data);
          window.location.reload(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  
    

  return (
    <div>
      <div className="App-header">
        {patients.length > 0 ? (
             patients
            .map((user) => {
              return (
              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name:{user.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date Of Birth: {user.dateOfBirth}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender: {user.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Mobile: {user.mobile}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Package: {user.package}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Health Records: {user.healthRecords}
                  </h3>
                  <button
  style={{ backgroundColor: "green" }}
  data-user-id={user._id} // Set the user's ID as a data attribute
  onClick={selectPatient}
>
  Select
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

export default SelectPatientList;
