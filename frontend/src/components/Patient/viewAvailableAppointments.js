import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import patientService from "../../services/patientService";
import Home from "../gohome";

function AvailableAppointments(id) {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      retrieveAppointments();
    }, []);
  
    const retrieveAppointments = () => {

      patientService.AvailableAppointments(id)
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
        <Home />
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
                      Date: {appointment.date}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Start Time: {appointment.startTime}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      End Time: {appointment.endTime}
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
export default AvailableAppointments;