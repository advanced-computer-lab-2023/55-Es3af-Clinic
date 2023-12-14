import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
import Home from "../gohome";

const DoctorsList = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    setLoading(true);
    PatientService.viewDoctors()
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
      })
      .finally(() => {
        setLoading(false); 
      });
  };
  return (
    <div>
      <Home />
      {loading ? (
        <div class="preloader">
            <div class="loader">
                <div class="loader-outter"></div>
                <div class="loader-inner"></div>

                <div class="indicator"> 
                    <svg width="16px" height="12px">
                        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>      ) : (
      <div className="App-header">
        {users.length > 0 ? (
          users.map((user) => {
            // const doctorID = user._id.valueOf()
            // console.log(doctorID)
            return (
              
              <div
                className="card"
                key={user.id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                   Name: {user.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                  Speciality:  {user.speciality}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Hourly Rate: {user.price}
                  </h3>
                  <a href= {`/patient/doctorInfo/${user.id}`} rel="noopener noreferrer">
                    <button className = "btn btn-primary">View Details</button>
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Doctors</h2>
          </div>
        )}
      </div>
        )}
    </div>
  );

}
export default DoctorsList;