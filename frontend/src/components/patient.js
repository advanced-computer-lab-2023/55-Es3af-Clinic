import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import memberService from "../services/familyMemberService";

function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/members" element={<MembersList />} />
    </Routes>
  );
}

function PatientHome() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/patient" rel="noopener noreferrer">
            <button className="btn btn-primary"> view Family Members </button>
            <button className="btn btn-primary"> view Doctors </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default PatientPage;
