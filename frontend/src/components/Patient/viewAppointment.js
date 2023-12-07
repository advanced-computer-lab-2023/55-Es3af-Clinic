import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
//import "./ViewAppointments.css"; // Import your CSS file for styling

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("myAppointments");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveAppointments();
  }, [activeTab]);

  const retrieveAppointments = () => {
    setLoading(true); // Set loading to true when starting to fetch data

    let serviceFunction;
    if (activeTab === "myAppointments") {
      serviceFunction = PatientService.viewPatientsAppointments;
    } else if (activeTab === "familyMembersAppointments") {
      // Use the appropriate service function for family members' appointments
      //serviceFunction = PatientService.viewFamilyMembersAppointments;
    }

    if (serviceFunction) {
      serviceFunction()
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
        })
        .finally(() => {
          setLoading(false); // Set loading to false when data fetching is complete
        });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {loading ? (
        <div className="loading-icon">Loading...</div>
      ) : (
        <div className="App-header">
          <div className="tabs">
        <button
          className={`tab ${activeTab === "myAppointments" ? "active" : ""}`}
          onClick={() => handleTabChange("myAppointments")}
        >
          My Appointments
        </button>
        <button
          className={`tab ${
            activeTab === "familyMembersAppointments" ? "active" : ""
          }`}
          onClick={() => handleTabChange("familyMembersAppointments")}
        >
          My Family Members' Appointments
        </button>
      </div>
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
                    {activeTab === "familyMembersAppointments" && (
                      <h3 className="card-title" style={{ color: "white" }}>
                        Patient Name: {appointment.patientName}
                      </h3>
                    )}
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
                    {appointment.status === "done" && (
                      <button className="btn btn-primary"
                        // onClick={() => handleFollowUpRequest(appointment.id,appointment.doctorid)}
                      >
                        Request a FollowUp
                      </button>
                    )}
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
      )}
    </div>
  );
};

export default ViewAppointments;
