import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    retrieveAppointments();
  }, []);

  const retrieveAppointments = () => {
   // const patientID = "6550d16d35b498d6ba1de825";
    PatientService.viewPatientsAppointments()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.log("Data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="App-header">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            return (
              <div
                className="card"
                key={appointment.id}
                style={{
                  width: 450,
                  backgroundColor: "#282c34",
                  margin: 10,
                }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Doctor: {appointment.doctor}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date: {appointment.date}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Duration: {appointment.duration}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Status: {appointment.status}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Appointments</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
