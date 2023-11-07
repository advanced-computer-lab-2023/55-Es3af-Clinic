import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddMember from "./addFamilyMember";
import MembersList from "./viewFamilyMembers"
import DoctorsList from "./viewDoctors";
import PrescriptionList from "./viewPrescriptions";
import DoctorInfo from './doctorInfo'
import SearchDoctor from './search'
import FilteredPrescriptionList from "./filterprescriptionsbydatestatusdoctor";
import FilteredAppointmentsList from "./filterAppointmentsByDateAndStatuspatient"; 
import FilterDoctors from "./Filterdoctors";
import PkgList from "../viewPackages";
import UpdatePassword from './updatePassword';
import AddMemberAcc from "./addMemberByAcc";

function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/addFamilyMember" element={<AddMember />} />
      <Route path="/familyMembers" element={<MembersList />} />
      <Route path="/viewDoctors" element={<DoctorsList />} />
      <Route path= '/doctorInfo/:id' element={<DoctorInfo />}/>
      <Route path= '/search' element = {<SearchDoctor />}/>
      <Route path= '/viewHealthPackages' element={<PkgList/>}/>
      <Route path="/viewPrescriptions" element={<PrescriptionList />} />
      <Route path="/filterprescriptionsbydatestatusdoctor" element={<FilteredPrescriptionList />} />
      <Route path="/filterAppointmentsByDateAndStatus" element= {<FilteredAppointmentsList />} />
      <Route path="/searchBySpecDate" element= {<FilterDoctors />} />
      <Route path='/:id/updatePassword' element = {<UpdatePassword/>} />
      <Route path='/:username/addFamilyMemberByAcc' element = {<AddMemberAcc/>} />

    </Routes>
  );
}

function PatientHome() {
  var id = '652b2d531a7433f37b21860e'
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h5 className="top-right-button">Amount In Wallet:</h5>
          <a href="/patient/familyMembers" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Family Members </button>
            </a>
            <a href="/patient/addFamilyMember" rel="noopener noreferrer">
            <button className="btn btn-primary"> Add Family Members </button>
            </a>
            <a href="/patient/viewDoctors" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Doctors </button>
          </a>
          <a href="/patient/viewPrescriptions/" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Prescriptions </button>
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
          <a href={`/patient/${id}/updatePassword/`} rel="noopener noreferrer">
            <button className="btn btn-primary"> Update my Password </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
