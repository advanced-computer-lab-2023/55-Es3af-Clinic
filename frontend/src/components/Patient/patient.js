import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddMember from "./addFamilyMember";
import MembersList from "./viewFamilyMembers";
import DoctorsList from "./viewDoctors";
import PrescriptionList from "./viewPrescriptions";
import DoctorInfo from "./doctorInfo";
import SearchDoctor from "./search";
import FilteredPrescriptionList from "./filterprescriptionsbydatestatusdoctor";
import FilteredAppointmentsList from "./filterAppointmentsByDateAndStatuspatient";
import FilterDoctors from "./Filterdoctors";
import PkgListP from "./viewPackages";
import UpdatePassword from "../updatePassword";
import UploadMedicalHistory from "./UploadMedicalHistory";
import AddMemberAcc from "./addMemberByAcc";
import BookAnAppointment from "./BookAnAppointment";
import patientService from "../../services/patientService";
import ViewSubscribedPackages from "./viewSubscribedPackages";
import ViewAppointments from "./viewAppointment";
import AvailableAppointments from "./viewAvailableAppointments";
import ViewMedicalHistory from "./viewMedicalHistory";
import { FaComments } from "react-icons/fa"; // Import FontAwesome icon
import PatientNav from "../patientNav";
import DoctorSelectorPage from "../DoctorSelectorPage.js";
import PatientChat from "../patientChat.js";
import VideoChat from "../VideoChat.js";

function PatientPage() {
  return (
    <Routes>
      <Route path="/" element={<PatientHome />} />

      <Route path="/addFamilyMember" element={<AddMember />} />
      <Route path="/familyMembers" element={<MembersList />} />
      <Route path="/viewDoctors" element={<DoctorsList />} />
      <Route path="/doctorInfo/:id" element={<DoctorInfo />} />
      <Route path="/search" element={<SearchDoctor />} />
      <Route path="/viewHealthPackages" element={<PkgListP />} />
      <Route path="/viewPrescriptions" element={<PrescriptionList />} />
      <Route
        path="/filterprescriptionsbydatestatusdoctor"
        element={<FilteredPrescriptionList />}
      />
      <Route
        path="/filterAppointmentsByDateAndStatus"
        element={<FilteredAppointmentsList />}
      />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/UploadMedicalHistory" element={<UploadMedicalHistory />} />
      <Route path="/addFamilyMemberByAcc" element={<AddMemberAcc />} />
      <Route
        path="/viewSubscribedPackages"
        element={<ViewSubscribedPackages />}
      />
      <Route path="/viewAppointments" element={<ViewAppointments />} />
      <Route path="/BookAnAppointment" element={<BookAnAppointment />} />
      <Route path="/searchBySpecDate" element={<FilterDoctors />} />
      <Route
        path="/viewAvailableAppointments"
        element={<AvailableAppointments />}
      />
      <Route path="/viewMedicalHistory" element={<ViewMedicalHistory />} />
      <Route path="/doctorSelector" element={<DoctorSelectorPage />} />
      <Route path="/patientChat" element={<PatientChat />} />
      <Route path="/video-chat" element={<VideoChat />} />
    </Routes>
  );
}

function PatientHome() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const fetchMedicalHistory = async () => {
    try {
      const response = await patientService.viewMedicalHistory();
      const medicalHistoryData = response.data.result;
      setMedicalHistory(medicalHistoryData);
    } catch (error) {
      console.error("Error fetching medical history:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await patientService.getAmountInWallet();
        const amountInWalletResult = response.data;
        setResult(amountInWalletResult);
      } catch (error) {
        console.error(error);
        setResult("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewMedicalHistory = async () => {
    try {
      await fetchMedicalHistory();
      setShowMedicalHistory(true);
    } catch (error) {
      console.error("Error fetching medical history:", error.message);
    }
  };

  const handleRemoveMedicalHistory = async (medicalHistoryId) => {
    try {
      await patientService.removeMedicalHistory(medicalHistoryId);
      await fetchMedicalHistory();
    } catch (error) {
      console.error("Error removing medical history:", error.message);
    }
  };

  return (
    <div className="App">
      <PatientNav />
      {loading ? (
        <div className="preloader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>

            <div className="indicator">
              <svg width="16px" height="12px">
                <polyline
                  id="back"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
                <polyline
                  id="front"
                  points="1 6 4 6 6 11 10 1 12 6 15 6"
                ></polyline>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <header className="App-header">
          <div className="payment-buttons">
            <h5>Amount In Wallet: {result} </h5>
            <a href="/patient/familyMembers" rel="noopener noreferrer">
              <button className="btn btn-primary"> View Family Members </button>
            </a>
            <a href="/patient/addFamilyMember" rel="noopener noreferrer">
              <button className="btn btn-primary"> Add Family Members </button>
            </a>
            <a href="/patient/viewDoctors" rel="noopener noreferrer">
              <button className="btn btn-primary"> View Doctors </button>
            </a>
            <a href="/patient/viewAppointments" rel="noopener noreferrer">
              <button className="btn btn-primary"> View Appointments </button>
            </a>
            <a href="/patient/viewPrescriptions" rel="noopener noreferrer">
              <button className="btn btn-primary"> View Prescriptions </button>
            </a>
            <a href="/patient/search" rel="noopener noreferrer">
              <button className="btn btn-primary"> Search </button>
            </a>
            <a
              href="/patient/filterAppointmentsByDateAndStatus"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary"> Filter Appointments </button>
            </a>
            <a href="/patient/searchBySpecDate" rel="noopener noreferrer">
              <button className="btn btn-primary"> Filter Doctors </button>
            </a>
            <a href="/patient/viewHealthPackages" rel="noopener noreferrer">
              <button className="btn btn-primary">
                {" "}
                View Health Packages{" "}
              </button>
            </a>
            <a href={`/patient/updatePassword`} rel="noopener noreferrer">
              <button className="btn btn-primary"> Update my Password </button>
            </a>
            <a href={`/patient/UploadMedicalHistory`} rel="noopener noreferrer">
              <button className="btn btn-primary">
                {" "}
                Upload Medical History{" "}
              </button>
            </a>
            <a href="/patient/viewMedicalHistory" rel="noopener noreferrer">
              <button
                className="btn btn-primary" // You can adjust this class based on your styling
                onClick={handleViewMedicalHistory}
              >
                View/Remove Medical History
              </button>
            </a>
            {showMedicalHistory && (
              <ViewMedicalHistory
                medicalHistory={medicalHistory}
                removeMedicalHistory={handleRemoveMedicalHistory}
              />
            )}
            <a href={`/patient/BookAnAppointment`} rel="noopener noreferrer">
              <button className="btn btn-primary"> Book An Appointment </button>
            </a>
            <a href="/patient/viewSubscribedPackages" rel="noopener noreferrer">
              <button className="btn btn-primary">
                {" "}
                View Subscribed Health Packages{" "}
              </button>
            </a>
            <Link to="/patient/doctorSelector" className="chat-button">
              <FaComments size={24} color="white" />
            </Link>
          </div>
          <div>
            <Link to="/patient/video-chat" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary"> Video Chat </button>
            </Link>
          </div>
        </header>
      )}
    </div>
  );
}

export default PatientPage;
