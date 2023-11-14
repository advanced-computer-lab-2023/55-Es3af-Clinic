import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddMember from "./addFamilyMember";
import MembersList from "./viewFamilyMembers"
import DoctorsList from "./viewDoctors";
import PrescriptionList from "./viewPrescriptions";
import DoctorInfo from './doctorInfo'
import SearchDoctor from './search'
import FilteredPrescriptionList from "./filterprescriptionsbydatestatusdoctor";
import FilteredAppointmentsList from "./filterAppointmentsByDateAndStatuspatient"; 
import FilterDoctors from "./Filterdoctors";
import PkgListP from "./viewPackages";
import UpdatePassword from './updatePassword';
import UploadMedicalHistory from './UploadMedicalHistory';
import AddMemberAcc from "./addMemberByAcc";
import BookAnAppointment  from "./BookAnAppointment";
import patientService from "../../services/patientService";
import ViewSubscribedPackages from './viewSubscribedPackages';
import ViewAppointments from "./viewAppointment";
import Navbar from "../navbar";


function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/addFamilyMember" element={<AddMember />} />
      <Route path="/familyMembers" element={<MembersList />} />
      <Route path="/viewDoctors" element={<DoctorsList />} />
      <Route path= '/doctorInfo/:id' element={<DoctorInfo />}/>
      <Route path= '/search' element = {<SearchDoctor />}/>
      <Route path= '/viewHealthPackages' element={<PkgListP/>}/>
      <Route path="/viewPrescriptions" element={<PrescriptionList />} />
      <Route path="/filterprescriptionsbydatestatusdoctor" element={<FilteredPrescriptionList />} />
      <Route path="/filterAppointmentsByDateAndStatus" element= {<FilteredAppointmentsList />} />
      <Route path='/:id/updatePassword' element = {<UpdatePassword/>} />
      <Route path='/UploadMedicalHistory' element = {<UploadMedicalHistory/>} />
      <Route path='/:username/addFamilyMemberByAcc' element = {<AddMemberAcc/>} />
      <Route path="/viewSubscribedPackages" element={<ViewSubscribedPackages />} />
      <Route path="/viewAppointments" element={<ViewAppointments />} />
        <Route path='/BookAnAppointment' element = {<BookAnAppointment/> } />
        <Route path="/searchBySpecDate" element= {<FilterDoctors />} />

    </Routes>
  );
}

function PatientHome() {
  //var id = '6550f3b6d9aee1af3acedf0a'
  const [result, setResult] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await patientService.getAmountInWallet();
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
      <Navbar />
      <header className="App-header">
        <div className="payment-buttons">
          <h5 className="top-right-button">Amount In Wallet: {result} </h5>
          <a href="/patient/familyMembers" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Family Members </button>
            </a>
            <a href="/patient/addFamilyMember" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Family Members </button>
            </a>
            <a href="/patient/viewDoctors" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Doctors </button>
          </a>
          <a href = '/patient/viewAppointments' rel="noopener noreferrer">
          <button className="btn btn-primary"> View Appointments </button>
          </a>
          
          <a href="/patient/viewPrescriptions/" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Prescriptions </button>
          </a>
          <a href="/patient/search/" rel="noopener noreferrer">
            <button className="btn btn-primary"> Search </button>
            </a>
          <a href="/patient/filterAppointmentsByDateAndStatus/" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Appointments </button>
          </a>
          <a href="/patient/searchBySpecDate/" rel="noopener noreferrer">
            <button className="btn btn-primary"> Filter Doctors </button>
          </a>
          <a href="/patient/viewHealthPackages/" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Health Packages </button>
          </a>
          <a href={`/patient/updatePassword/`} rel="noopener noreferrer">
            <button className="btn btn-primary"> Update my Password </button>
          </a>
          <a href={`/patient/UploadMedicalHistory/`} rel="noopener noreferrer">
            <button className="btn btn-primary"> Upload Medical History </button>
          </a>
          <a href={`/patient/BookAnAppointment/`} rel="noopener noreferrer">
            <button className="btn btn-primary"> Book An Appointment </button>
          </a>
          <a href="/patient/viewSubscribedPackages" rel="noopener noreferrer">
            <button className="btn btn-primary"> View Subscribed Health Packages </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
