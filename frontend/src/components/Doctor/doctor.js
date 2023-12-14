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
import UpdatePassword from '../updatePassword.js';
import doctorService from "../../services/doctorService.js";
import AddTimeSlots from './addTimeSlots';
import UploadPatientHealthRecords from './uploadPatientHealthRecords';
import MyContractList from './viewEmploymentContract.js';
import Navbar from "../navbar.js";
import AddPrescription from './addPrescription.js';
import ViewAllPrescriptions from './viewAllPrescriptions.js';
import PatientSelectorPage from "../PatientSelectorPage.js";
import DoctorChat from "../doctorChat"


function DoctorPage() {
  return (
    <Routes>
      <Route path ="/addPrescription/:id" element={<AddPrescription/>}/>
      <Route path="/getAllPrescriptions" element={<ViewAllPrescriptions />} />
      <Route path="/" element={<DoctorHome />} />
      <Route path='/updatePassword' element = {<UpdatePassword/>} />
      <Route path="/getAllMyPatients" element={< MyPatientList/>} />
      {/* <Route path="/updateDoctor" element={< UpdateDoctor/>} /> */}
      <Route path="/updateDoctor2" element={< EditDoctor/>} />
      {/* <Route path="/getPatients" element={< SelectPatientList/>} /> */}
      <Route path="/filterAppointmentsByDateAndStatus" element= {< FilteredAppointments />} />
      <Route path="/searchPatientByName" element={< SearchPatient/>} />
      <Route path="/filterPatientsByUpcomingPendingAppointments" element= {< FilteredPatientsByAppointments />} />
      <Route path="/" element={<DoctorHome />} />
      <Route path="/addTimeSlots" element={<AddTimeSlots />} /> 
      <Route path="/uploadPatientHealthRecords" element={<UploadPatientHealthRecords/>} /> 
      <Route path ="/contracts" element={<MyContractList/>}/>
      <Route path="/patientSelector" element={<PatientSelectorPage/>}/>
      <Route path="/doctorChat" element={<DoctorChat />} />
    </Routes>
  );
}

function DoctorHome() {
  // var id = '6525afac114367999aba79df'
 // var username="doc1"
  const [result, setResult] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await doctorService.getAmountInWallet();
        const amountInWalletResult = response.data;   
        setResult(amountInWalletResult);
      } catch (error) {
        console.error(error);
        setResult("Error"); 
      }
    };
    fetchData(); 
  }, []);
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div>
        <h5 >Amount In Wallet: {result} </h5>
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
          <a href="/doctor/getAllPrescriptions" rel="noopener noreferrer">
          <button className="btn btn-primary">View All Prescriptions</button>
        </a>
          <a href="/doctor/filterAppointmentsByDateAndStatus" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Appointments by Date and Status </button>
          </a>
          <a href="/doctor/filterPatientsByUpcomingPendingAppointments" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Patients by Upcoming Appointments </button>
          </a>
          <a href={"/doctor/updatePassword"} rel="noopener noreferrer">
            <button className="btn btn-primary"> Update my Password </button>
          </a>
          <a href="/doctor/addTimeSlots" rel="noopener noreferrer">
              <button className="btn btn-primary">Add Available Time Slots</button>
          </a>
          <a href="/doctor/uploadPatientHealthRecords" rel="noopener noreferrer">
              <button className="btn btn-primary">Upload Patient Health Record</button>
          </a>
          <a href="/doctor/contracts" rel="./components/doctor/viewEmploymentContract.js">
            <button className="btn btn-primary"> Contracts </button>
          </a>
          <a href="/doctor/patientSelector" rel="noopener noreferrer">
            <button className="btn btn-primary"> Select Patient to Chat With </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default DoctorPage;
