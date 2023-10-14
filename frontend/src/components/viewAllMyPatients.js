import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../services/doctorService";

const MyPatientList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    DoctorService.getAllMyPatients("doc1")
        .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
            setUsers(response.data);
        }
        else {
            // Handle the case where response.data is not an array
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
        {users.length > 0 ? (
          users.map((user) => {
            return (

              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                     Name: {user.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                     Email: {user.email}
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
                     Health Records: {user.healthRecords}
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

}
export default MyPatientList;