import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import AddMember from "./addFamilyMember";
import MembersList from "./viewFamilyMembers"
import DoctorsList from "./viewDoctors";
import PrescriptionList from "./viewPrescriptions";
import FilteredPrescriptionList from "./filterprescriptionsbydatestatusdoctor";
import FilteredAppointmentsList from "./filterAppointmentsByDateAndStatuspatient"; 
import FilterDoctors from "./Filterdoctors";

function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/addFamilyMember" element={<AddMember />} />
      <Route path="/familyMembers" element={<MembersList />} />
      <Route path="/viewDoctors" element={<DoctorsList />} />
      <Route path="/viewPrescriptions" element={<PrescriptionList />} />
      <Route path="/filterprescriptionsbydatestatusdoctor" element={<FilteredPrescriptionList />} />
      <Route path="/filterAppointmentsByDateAndStatus" element= {<FilteredAppointmentsList />} />
      <Route path="/searchBySpecDate" element= {<FilterDoctors />} />

    </Routes>
  );
}

function PatientHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
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
          <a href="/patient/filterAppointmentsByDateAndStatus/" rel="noopener noreferrer">
            <button className="btn btn-primary"> filter Appointments </button>
          </a>
          <a href="/patient/searchBySpecDate/" rel="noopener noreferrer">
            <button className="btn btn-primary"> filter Doctors </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
