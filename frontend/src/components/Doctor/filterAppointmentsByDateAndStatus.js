import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import Home from "../gohome";

function FilteredAppointments() {
  const intialBody = {
    appointmentid:"",
  };
  const intialBody1 = {
    appointmentid:"",
    prevappointmentid:"",
  };

  // const initialDetails = {
  //   patientID: '',
  //   patientName: '',
  //   slot: {
  //     date: '',
  //     startTime: '',
  //     endTime: ''
  //   }
  // }

  const [results, setResults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentBanner, setAppointmentBanner] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [doctorHasAppointments, setDoctorHasAppointments] = useState(false);
  const [body,setBody]= useState(intialBody);
  const [details, setDetails] = useState({})
  const [slotsBanner, setSlotsBanner] = useState(false)
  const [slots, setSlots] = useState([])
  const [patient, setPatient] = useState({})
  const [send, setSend] = useState(false)
  const [body1,setBody1]= useState(intialBody1);


  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value
    const status = event.target.statusDD.value;
    // const doctorid = "6525afac114367999aba79df";
    const response = await doctorService.FilteredAppointments(
      date,
      status
    );

    setResults(response.data);
    setSearchPerformed(true);
  };
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time1) => {
    const time = new Date(time1)
    const hour = time.getHours()
    const minute = time.getMinutes()
    return `${hour}:${minute}`
  }

  const handleFollowUp = async (patientID, patientName) => {
    setSlotsBanner(true)
    const timeSlots = await doctorService.getTimeSlots()
    setSlots(timeSlots)
    setDetails({patientID: patientID, patientName: patientName})
  }

  const bookFollowUp = async (slot) => {
    const slotTime = {
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime
    }
    setDetails(details => ({...details, slotTime}))
    //book2();
  }

  const book2 = async () => {
    //console.log('hanady 3al function ')
    await doctorService.scheduleFollowUp(details)
    alert('Follow up scheduled successfully')
    setSlotsBanner(false)
  }

  useEffect(() => {
    //console.log(details)
    if (details.slotTime) {
      book2();
    }
  }, [details])

  const handleCancel = (appId) => {
    // Create a new object with the updated appointmentId
    const updatedBody = {
      ...body,
      appointmentid: appId,
    };
  
    // Update the state
    setBody(updatedBody);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the asynchronous call after updating the state
        const response = await doctorService.cancelAppointment(body);
        console.log(response);
        alert(response.data.message);
  
        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error('Error canceling appointment:', error);
      }
    };
  
    // Check if appointmentid has been updated
    if (body.appointmentid !== "") {
      fetchData();
    }
  }, [body.appointmentid, setBody]);


  const handleReschedule = async (appId) => {
    try {
      // Create a new object with the updated appointmentId
      const updatedBody = {
        ...body1,
        prevappointmentid: appId,
      };

      // Update the state
      setBody1(updatedBody);
      // Make the asynchronous call after updating the state
      const response = await doctorService.getTimeSlots();
      const appointmentsData = response;
      console.log(response);
      setAppointments(appointmentsData);
      setDoctorHasAppointments(appointmentsData.length > 0);
      setAppointmentBanner(true);
      console.log(response);
    } catch (error) {
      console.error('Error loading time slots:', error);
    }
  };

  const handleRescheduleThis= async(tID)=>{
    try{
      const updatedBody = {
        ...body1,
        appointmentid: tID,
      };
      const response= await doctorService.rescheduleAnAppointment(updatedBody)
      alert(response.data)
      setBody1(updatedBody);
    }catch (error) {
      console.error('Error loading time slots:', error);
    }
  }

  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <form className="App-header" onSubmit={search}>
          <div className="form-group">
            <label htmlFor="InputUsername">Appointments</label>
            <div>
              <label>Status: </label>
              <select id="statusDD">
                <option value="" disabled selected hidden color="grey">Status</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
                <option value="currently working">Currently Working</option>
                <option value="pending">Pending</option>
                <option value="rescheduled">Rescheduled</option>
              </select>
            </div>
            <div>
              <label>Date: </label>
              <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              placeholder="enter date" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <p></p>
          {results.length > 0 || !searchPerformed ? (
          results.map((result) => {
            return (
              <div
                className="card"
                key={result._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                <h3 className="card-title" style={{ color: "white" }}>
                      Patient: {result.patientName}
                    </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Duration: {result.duration}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Status: {result.status}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Date: {formatDateOfBirth(result.date)}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                   Time: {formatTime(result.date)}
                  </h3>
                  {result.status == "done" && (
                      <button
                          className="btn btn-primary"
                          style={{ marginInlineEnd: 0 }}
                          onClick={() => handleFollowUp(result.patient, result.patientName)}
                      >
                          Follow Up
                      </button>
                  )}
                  {result.status === "pending" && (
                    <div>
                        <div className="cancel-button-container">
                      <button className="btn-cancel"
                      style={{marginInlineEnd:0}} 
                        onClick={() => handleCancel(result._id)}
                      >
                        Cancel
                      </button>
                    </div>
                    <button className="btn btn-primary"
                      style={{marginInlineEnd:0}} 
                        onClick={() => handleReschedule(result._id)}
                      >
                        Reschedule
                      </button>
                      </div>
                    )}
                  </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Appointments found</h2>
          </div>
        )}
          
        </form>
      </header>
      {slotsBanner && <div className="overlay"></div>}
      {slotsBanner && (
        <div className="member-banner" style={{ overflowY: "auto" }}>
          <div
            className="close-icon"
            onClick={() => setSlotsBanner(false)}
          >
            &times; {/* Unicode "times" character (×) */}
          </div>
          {slots ? (
            slots.map((slot) => (
              <div
                key={slot._id}
                className="card"
                style={{
                  width: "450px",
                  backgroundColor: "#282c34",
                  margin: "10px",
                }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date: {formatDateOfBirth(slot.date)}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Start Time: {slot.startTime}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    End Time: {slot.endTime}
                  </h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("Clicked Appointment ID:", slot._id);
                      bookFollowUp(slot)
                    }}
                  >
                    Select this time slot
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
      )}
      {appointmentBanner && <div className="overlay"></div>}

      {appointmentBanner && (
        <div className="member-banner" style={{ overflowY: "auto" }}>
          <div
            className="close-icon"
            onClick={() => setAppointmentBanner(false)}
          >
            &times; {/* Unicode "times" character (×) */}
          </div>
          {doctorHasAppointments ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="card"
                style={{
                  width: "450px",
                  backgroundColor: "#282c34",
                  margin: "10px",
                }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Date: {formatDateOfBirth(appointment.date)}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Start Time: {appointment.startTime}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    End Time: {appointment.endTime}
                  </h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("Clicked Appointment ID:", appointment._id);
                      handleRescheduleThis(appointment._id);
                    }}
                  >
                    Reschedule To This Appointment
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
      )}
    </div>
  );
}
export default FilteredAppointments;