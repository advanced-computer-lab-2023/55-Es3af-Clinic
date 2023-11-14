import React, { useState,useEffect } from 'react';
import patientService from '../../services/patientService';
import { useNavigate } from 'react-router-dom';
import MemberService from "../../services/familyMemberService";


function BookAnAppointment() {
  const intialBody = {
    id:'',
    name:"",
    doctorid:"",
    appointmentid:"",
    amount:0,
    disc:0
  };
  const [results, setResults] = useState([]);
  const [members, setMembers] = useState([]);
  const [body,setBody]= useState(intialBody);
  const [showBanner, setShowBanner] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentBanner, setAppointmentBanner] = useState(false);
  const [doctorHasAppointments, setDoctorHasAppointments] = useState(false);

  useEffect(() => {
    retrieveMembers();
  }, []);
  const navigate = useNavigate();
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const retrieveMembers = () => {
    MemberService.getAll()
        .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const flattenedUsers = response.data.flat();
          setMembers(flattenedUsers);
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
  const handleBookAppointment = async (doctorId) => {
    try {
      setAppointmentBanner(true);
      setBody((prevBody)=>{
        const updatedBody = {
          ...prevBody,
          doctorid:doctorId,
        };
        return updatedBody;
      })
      const response = await patientService.AvailableAppointments(doctorId);
      console.log('API Response:', response.data);
  
      const appointmentsData = response.data;
      setAppointments(appointmentsData);
      setDoctorHasAppointments(appointmentsData.length > 0);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setDoctorHasAppointments(false); // No appointments in case of an error
    }
  };

  const handleBookAppointment2 = async (appId) => {
    console.log(appId);
    setAppointmentBanner(false);
    setShowBanner(true);
    setBody((prevBody)=>{
      const updatedBody = {
        ...prevBody,
        appointmentid:appId,
      };
      return updatedBody;
    })
  }
  
  const search = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const speciality = event.target.speciality.value;

    const response = await patientService.FilterDoctors(date, speciality);
    setResults(response.data);
  };
  const handleMemberSelection = (selectedMemberId, selectedMemberName) => {
    // Check if the selected member has a package attribute
    const selectedMember = members.find((member) => member.id === selectedMemberId);
    const hasPackage = selectedMember && selectedMember.package;
  
    // Conditionally set the id and name in the body
    setBody((prevBody) => ({
      ...prevBody,
      id: hasPackage ? selectedMemberId : '',
      name: selectedMemberName ,
    }));
    console.log(body);
  };
  async function subscribe(e){
    e.preventDefault();
    console.log(body)
      try {
        const response = await patientService.withdrawFromWallet(body.amount);
        if(response.data.localeCompare("Amount deducted successfully")==0){
          patientService.BookAnAppointment(body).then((response1) => {
            alert(response1.data+"\n Amount deducted successfully");
          })
          .catch((e) => {
            console.log(e);
          });
        }
        else{
        alert(response.data);
      }
        //alert(updatedMoney.amount);
      } catch (e) {
        console.log(e);
      }
  }
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
          
        </form>
      </header>
      
      {appointmentBanner && (
        <div className="overlay"></div>
      )}

       {appointmentBanner && (
    <div className="member-banner">
      {doctorHasAppointments ? (
        appointments.map((appointment) => (
              <div
                className="card"
                key={appointment._id}
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
                      console.log('Clicked Appointment ID:', appointment._id);
                      handleBookAppointment2(appointment._id);
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
      )}
      
      {showBanner && (
        <div className="overlay"></div>
      )}

      {showBanner && (
        <div className="member-banner">
            <div>
          {members.map((member) => (
            <label key={member.id} style={{ display: "block" }}>
              <input type="radio" value={member.name}onChange={() => handleMemberSelection(member.name,member.id)} /> {member.name}
              <input type="radio" 
              onChange={() => handleMemberSelection('','')} /> {"Myself"}

            </label>
          ))}
          </div>
          <div className="payment-buttons">
            <button className="btn btn-primary"onClick={subscribe} >Pay Using Wallet</button>
            <button className="btn btn-primary">Pay Using Credit Card</button>
          </div>
        </div>
      )}
    </div>

  );
}

export default BookAnAppointment;