import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyPatientList from "./viewAllMyPatients";
// import UpdateDoctor from "../components/updateDoctor";
//import SelectPatientList from "../components/selectPatient";
import EditDoctor from "./updateDoctor2";
import FilteredAppointments from "./filterAppointmentsByDateAndStatus.js";
import SearchPatient from "./searchForPatientByName.js";
import FilteredPatientsByAppointments from "./filterPatientByAppointment";
import UpdatePassword from '../Doctor/updatePassword';
import doctorService from "../../services/doctorService.js";
import AddTimeSlots from './addTimeSlots';
import MyContractList from './viewEmploymentContract.js';



function DoctorPage() {
  return (
    <Routes>
      <Route path="/" element={<DoctorHome />} />
      <Route path='/:id/updatePassword' element = {<UpdatePassword/>} />
      <Route path="/getAllMyPatients" element={< MyPatientList/>} />
      {/* <Route path="/updateDoctor" element={< UpdateDoctor/>} /> */}
      <Route path="/updateDoctor2" element={< EditDoctor/>} />
      {/* <Route path="/getPatients" element={< SelectPatientList/>} /> */}
      <Route path="/filterAppointmentsByDateAndStatus" element= {< FilteredAppointments />} />
      <Route path="/searchPatientByName" element={< SearchPatient/>} />
      <Route path="/filterPatientsByUpcomingPendingAppointments" element= {< FilteredPatientsByAppointments />} />
      <Route path="/" element={<DoctorHome />} />
      <Route path="/addTimeSlots" element={<AddTimeSlots />} /> 
      <Route path ="/contracts" element={<MyContractList/>}/>
    </Routes>
  );
}

function DoctorHome() {
  var id = '6525afac114367999aba79df'
  var username="doc1"
  const [result, setResult] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await doctorService.getAmountInWallet(username);
        const amountInWalletResult = response.data; 
        setResult(amountInWalletResult);
      } catch (error) {
        console.error(error);
        setResult("Error"); 
      }
    };
    fetchData(); 
  });
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h5 className="top-right-button">Amount In Wallet: {result} </h5>
          <a href="/doctor/getAllMyPatients" rel="noopener noreferrer">
            <button className="btn btn-primary"> View All My Patients </button>
            </a>
            {/* <a href="/doctor/getPatients" rel="noopener noreferrer">
            <button className="btn btn-primary"> Select a Patient </button>
            </a> */}
            <a href={"/doctor/updateDoctor2"} rel="noopener noreferrer">
            <button className="btn btn-primary">Edit My Information</button>
            </a>
            <a href="/doctor/searchPatientByName" rel="noopener noreferrer">
            <button className="btn btn-primary"> Search for Patient by Name </button>
          </a>
          <a href="/doctor/filterAppointmentsByDateAndStatus" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Appointments by Date and Status </button>
          </a>
          <a href="/doctor/filterPatientsByUpcomingPendingAppointments" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Patients by Upcoming Appointments </button>
          </a>
          <a href={`/doctor/${id}/updatePassword/`} rel="noopener noreferrer">
            <button className="btn btn-primary"> Update my Password </button>
          </a>
          <a href="/doctor/addTimeSlots" rel="noopener noreferrer">
              <button className="btn btn-primary">Add Available Time Slots</button>
          </a>
          <a href="/doctor/contracts" rel="./components/doctor/viewEmploymentContract.js">
            <button className="btn btn-primary"> Contracts </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default DoctorPage;
