import React, { useState } from 'react';
import patientService from '../../services/patientService';
import { useNavigate } from 'react-router-dom';
import MemberService from "../../services/familyMemberService";


function BookAnAppointment() {
  const [results, setResults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentBanner, setAppointmentBanner] = useState(null);
  const navigate = useNavigate();
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBookAppointment = async (doctorId) => {
    try {
      const response = await patientService.AvailableAppointments(doctorId);
      setAppointments(response.data);

      // Set the appointmentBanner state with the content you want to display
      setAppointmentBanner(
        <div className="appointment-banner">
          {response.data.length > 0 ? (
            response.data.map((appointment) => (
              <div
                className="card"
                key={appointment.id}
                style={{
                  width: 450,
                  backgroundColor: '#282c34',
                  margin: 10,
                }}
              >
 <div className="card-body">
                  <h3 className="card-title" style={{ color: 'white' }}>
                    Date: {formatDateOfBirth(appointment.date)}
                  </h3>
                  <h3 className="card-title" style={{ color: 'white' }}>
                    Start Time: {appointment.startTime}
                  </h3>
                  <h3 className="card-title" style={{ color: 'white' }}>
                    End Time: {appointment.endTime}
                  </h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log('Clicked Appointment ID:', appointment.id);
                      handleBookAppointment(appointment.id);
                    }}
                  >
                    Book This Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2>No Appointments</h2>
            </div>
          )}
        </div>
      );

      // Optionally, navigate to a different route
      // navigate('/patient/viewAvailableAppointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle the error as needed
    }
  };
  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const speciality = event.target.speciality.value;

    const response = await patientService.FilterDoctors(date, speciality);
    setResults(response.data);
    setAppointments([]); // Clear the appointments when a new search is performed
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Choose by speciality</label>
            <input
              type="string"
              className="form-control"
              id="speciality"
              name="speciality"
              placeholder="enter speciality"
            />
            <label htmlFor="InputUsername">Choose by date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              placeholder="enter date"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p>results</p>
          {results.length > 0 ? (
            results.map((result) => (
              <div
                className="card"
                key={result._id}
                style={{ width: 450, backgroundColor: '#282c34', margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: 'white' }}>
                    Doctor: {result.name}
                  </h3>
                  <h3 className="card-title" style={{ color: 'white' }}>
                    Hourly Rate: {result.price}
                  </h3>
                  <h3 className="card-title" style={{ color: 'white' }}>
                    Speciality: {result.speciality}
                  </h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log('Clicked Doctor ID:', result.id);
                      handleBookAppointment(result.id);
                    }}
                  >
                    Book This Doctor
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2>No Doctors found</h2>
            </div>
          )}

          {/* Conditionally render the appointment banner */}
          {appointmentBanner && <div>{appointmentBanner}</div>}
        </form>
      </header>
    </div>
  );
}

export default BookAnAppointment;