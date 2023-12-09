import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import PatientPage from './components/Patient/patient'
import RegisterPatient from './components/RegisterPatient'
import RequestDoctor from "./components/RequestDoctor"
import DoctorPage from './components/Doctor/doctor';
import AdminPage from './components/Admin/admin';
import Login from './components/login';
import ForgetPassword from './components/forgetPassword'
import ResetPassword from './components/resertPassword';
import DoctorSelectPage from "./components/DoctorSelectorPage"
import PatientSelectPage from "./components/PatientSelectorPage"
import ChatApp from './components/chatPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/patient/*" element={<PatientPage />} />
    <Route path="/doctor/*" element={<DoctorPage />} />
    <Route path="/register/*" element={<RegisterPatient />} />
    <Route path="requestDoctor/*" element={<RequestDoctor/>} />
    <Route path="/admin/*" element={<AdminPage/>} />
    <Route path="/forgetPassword" element={<ForgetPassword/>} />
    <Route path="/resetPassword/:id" element={<ResetPassword/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/chat" element={<ChatApp />}/>
    <Route path="/doctorchat" element={<DoctorSelectPage/>}/>
    <Route path="/patientchat" element={<PatientSelectPage/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
