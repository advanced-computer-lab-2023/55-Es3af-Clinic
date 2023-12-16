import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import PatientService from "../../services/patientService";
import Home from "../gohome";
// import "./ViewAppointments.css"; // Import your CSS file for styling

const ViewAppointments = () => {
  const initialBody = {
    followAppId: "",
    doctorid: "",
    appointmentid: "",
  };
  const navigate = useNavigate();
  const [body, setBody] = useState(initialBody);
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [appointmentBanner, setAppointmentBanner] = useState(false);
  const [doctorHasAppointments, setDoctorHasAppointments] = useState(false);
  const [activeTab, setActiveTab] = useState("myAppointments");
  const [loading, setLoading] = useState(false);
  const [rescheduleInfo, setRescheduleInfo] = useState({
    prevAppointmentId: "",
    newAppointmentId: "",
  });

  useEffect(() => {
    retrieveAppointments();
  }, [activeTab]);

  const retrieveAppointments = () => {
    setLoading(true);
    setAppointments([]);
    let serviceFunction;
    if (activeTab === "myAppointments") {
      serviceFunction = PatientService.viewPatientsAppointments;
    } else if (activeTab === "familyMembersAppointments") {
      serviceFunction = PatientService.viewFamilyMembersAppointments;
    }

    if (serviceFunction) {
      serviceFunction()
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data)) {
            const flattenedUsers = response.data.flat();
            setAppointments(flattenedUsers);
          } else {
            console.log("Data is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowUpRequest = async (appId, doctorId) => {
    try {
      setAppointmentBanner(true);
      setBody((prevBody) => ({
        ...prevBody,
        doctorid: doctorId,
        appointmentid: appId,
      }));
      const response = await PatientService.AvailableAppointments(doctorId);
      console.log("API Response:", response.data);

      const appointmentsData = response.data;
      setTimeSlots(appointmentsData);
      setDoctorHasAppointments(appointmentsData.length > 0);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setDoctorHasAppointments(false);
    }
  };

  const handleRequest = (followId) => {
    const updatedBody = {
      ...body,
      followAppId: followId,
    };
    setBody(updatedBody);
  };

  const handleRescheduleConfirmation = async () => {
    try {
      const response = await PatientService.rescheduleAnAppointment(rescheduleInfo);
      console.log(response.data);
      alert(response.data);
      setAppointmentBanner(false);
      retrieveAppointments();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleTimeSlotSelection = (selectedTimeSlotId) => {
    setRescheduleInfo((prevRescheduleInfo) => ({
      ...prevRescheduleInfo,
      newAppointmentId: selectedTimeSlotId,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientService.requestFollowUp(body);
        console.log(response);
        alert(response.data);
      } catch (error) {
        console.error("Error requesting a follow-up:", error);
      }
    };

    if (body.followAppId !== "") {
      fetchData();
    }
  }, [body.followAppId]);

  const formatDate = (dateO) => {
    const date = new Date(dateO);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCancel = (appId) => {
    const updatedBody = {
      ...body,
      appointmentid: appId,
    };
    setBody(updatedBody);
  };

  const handleReschedule = (prevAppointmentId) => {
    setRescheduleInfo({
      prevAppointmentId,
      newAppointmentId: "",
    });
    setAppointmentBanner(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientService.cancelAppointment(body);
        console.log(response);
        alert(response.data.message);
        window.location.reload();
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    };

    if (body.appointmentid !== "") {
      fetchData();
    }
  }, [body.appointmentid, setBody]);

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
        </div>
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
              className={`tab ${activeTab === "familyMembersAppointments" ? "active" : ""}`}
              onClick={() => handleTabChange("familyMembersAppointments")}
            >
              My Family Members' Appointments
            </button>
          </div>
          <div
            className="appointments-container"
            style={{ maxHeight: "530px", overflowY: "auto" }}
          >
            {appointments.length > 0 ? (
              appointments
                .sort((a, b) => {
                  const order = { pending: 0, done: 1, canceled: 2 };
                  return order[a.status] - order[b.status];
                })
                .map((appointment) => (
                  <div
                    className="card"
                    key={appointment.id}
                    style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                  >
                    <div className="card-body">
                      {activeTab === "familyMembersAppointments" && (
                        <h3 className="card-title" style={{ color: "white" }}>
                          Patient Name: {appointment.patientName}
                        </h3>
                      )}
                      <h3 className="card-title" style={{ color: "white" }}>
                        Doctor: {appointment.doctor.name}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Date: {formatDate(appointment.date)}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Duration: {appointment.duration}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Status: {appointment.status}
                      </h3>
                      {appointment.status === "done" && (
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleFollowUpRequest(appointment._id, appointment.doctor._id)
                          }
                        >
                          Request a FollowUp
                        </button>
                      )}
                      {appointment.status === "pending" && (
                        <div className="cancel-button-container">
                          <button
                            className="btn-cancel"
                            style={{ marginInlineEnd: 0 }}
                            onClick={() => handleCancel(appointment._id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {appointment.status === "pending" && (
                        <div className="cancel-button-container">
                          <button
                            className="btn-cancel"
                            style={{ marginInlineEnd: 0 }}
                            onClick={() =>
                              handleReschedule(appointment._id, appointment.doctor._id)
                            }
                          >
                            Reschedule
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div>
                <h2>No Appointments</h2>
              </div>
            )}
          </div>
          {appointmentBanner && <div className="overlay"></div>}
          {appointmentBanner && (
            <div className="member-banner2">
              <div className="close-icon" onClick={() => setAppointmentBanner(false)}>
                &times;
              </div>
              {doctorHasAppointments ? (
                timeSlots.map((timeSlot) => (
                  <div
                    className="card"
                    key={timeSlot._id}
                    style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        Date: {formatDate(timeSlot.date)}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Start Time: {timeSlot.startTime}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        End Time: {timeSlot.endTime}
                      </h3>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRequest(timeSlot._id)}
                      >
                        Request Follow Up At This Time Slot
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h2>This doctor isn't free anytime soon</h2>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {appointmentBanner && <div className="overlay"></div>}
      {appointmentBanner && (
        <div className="member-banner2">
          <div className="close-icon" onClick={() => setAppointmentBanner(false)}>
            &times;
          </div>
          {rescheduleInfo && (
            <div className="reschedule-banner">
              <h3>Select a Time Slot:</h3>
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot._id} className="time-slot">
                  <input
                    type="radio"
                    id={timeSlot._id}
                    name="timeSlot"
                    value={timeSlot._id}
                    onChange={(e) => handleTimeSlotSelection(e.target.value)}
                  />
                  <label htmlFor={timeSlot._id}>
                    {formatDate(timeSlot.date)} | {timeSlot.startTime} - {timeSlot.endTime}
                  </label>
                </div>
              ))}
              <button onClick={handleRescheduleConfirmation}>Reschedule Appointment</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
