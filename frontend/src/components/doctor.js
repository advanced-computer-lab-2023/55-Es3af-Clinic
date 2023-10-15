import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import MyPatientList from "../components/viewAllMyPatients";
import UpdateDoctor from "../components/updateDoctor";
import SelectPatientList from "../components/selectPatient";
import EditDoctor from "../components/updateDoctor2";



function DoctorPage() {
  return (
    <Routes>
      <Route path="/" element={<DoctorHome />} />
      <Route path="/getAllMyPatients" element={< MyPatientList/>} />
      {/* <Route path="/updateDoctor" element={< UpdateDoctor/>} /> */}
      <Route path="/updateDoctor2" element={< EditDoctor/>} />
      <Route path="/getPatients" element={< SelectPatientList/>} />

    </Routes>
  );
}

function DoctorHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/doctor/getAllMyPatients" rel="noopener noreferrer">
            <button className="btn btn-primary"> View All My Patients </button>
            </a>
            <a href="/doctor/getPatients" rel="noopener noreferrer">
            <button className="btn btn-primary"> Select a Patient </button>
            </a>
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
        </div>
      </header>
    </div>
  );
}

export default DoctorPage;
