import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import AdminService from "../../services/adminService";
import RequestDoctor from "../RequestDoctor";

const DoctorsList = (props) => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    AdminService.viewDoctorData()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setDoctor(response.data);
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

  const acceptDoctor = (id) => {
    AdminService.acceptDoctorRequest(id)
      .then((response) => {
        console.log(response.data);
        // Update the UI if needed, e.g., remove the accepted doctor from the list
        retrieveMembers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const rejectDoctor = (id) => {
    AdminService.rejectDoctorRequest(id)
      .then((response) => {
        console.log(response.data);
        retrieveMembers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {doctor.length > 0 ? (
        doctor.map((doctor) => {
          return (
            <div
              className="card"
              key={doctor._id}
              style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
            >
              <div className="card-body">
                <h3 className="card-title" style={{ color: "white" }}>
                  Name: {doctor.name}
                </h3>
                <h3 className="card-title" style={{ color: "white" }}>
                  email: {doctor.email}
                </h3>
                <h3 className="card-title" style={{ color: "white" }}>
                  dateOfBirth: {formatDateOfBirth(doctor.dateOfBirth)}
                </h3>
                <h3 className="card-title" style={{ color: "white" }}>
                  Hourly Rate: {doctor.hourlyRate}
                </h3>
                <h3 className="card-title" style={{ color: "white" }}>
                  Affiliation: {doctor.affiliation}
                </h3>
                {/* ... (other doctor info) */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => acceptDoctor(doctor._id)}
                >
                  Accept Doctor
                </button>
                <button
                type="button"
                className="btn btn-danger"
                onClick={() => rejectDoctor(doctor._id)}
              >
                Reject Doctor
              </button>
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
  );
};

export default DoctorsList;
