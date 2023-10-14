import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import PatientPage from './components/patient'
import RegisterPatient from './components/RegisterPatient'
import RequestDoctor from "./components/RequestDoctor"
import DoctorPage from './components/doctor';
import AdminPage from './components/admin';
//import page that i want to test


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element ={<App />} />
    <Route path="/patient/*" element={<PatientPage />} />
    <Route path="/doctor/*" element={<DoctorPage />} />
    <Route path="/register/*" element={<RegisterPatient />} />
    <Route path="/requestDoctor/*" element={<RequestDoctor/>} />
    <Route path="/admin/*" element={<AdminPage/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
