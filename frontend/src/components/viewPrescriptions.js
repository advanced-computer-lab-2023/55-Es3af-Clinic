import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patientService";

const PrescriptionList = (props) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      retrieveMembers();
    }, []);
  
    const retrieveMembers = () => {
      PatientService.viewPrescriptions("652b2d531a7433f37b21860e")
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
  
                <><div
                  className="card"
                  key={user._id}
                  style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                >

                  <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                      Medicine: {user.medicine}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Doctor: {user.doctor.name}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Status:  {user.status}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Date: {user.date}
                    </h3>
                    <button className="btn btn-primary">Select</button>
                  </div>
                </div><div>
                    <a href="/patient/filterprescriptionsbydatestatusdoctor" rel="noopener noreferrer">
                      <button className="btn btn-primary"> filter Prescriptions </button>
                    </a> </div></>
              );
            })
          ) : (
            <div>
              <h2>No Prescriptions</h2>
            </div>
          )}
        </div>
      </div>
    );
  
  }
  export default PrescriptionList;