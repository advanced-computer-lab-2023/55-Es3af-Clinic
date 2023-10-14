import React, { useState, useEffect } from "react";
import DoctorService from "../services/doctorService";

function SelectPatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    // Fetch the list of patients
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await DoctorService.getAllMyPatients("doc1"); 
      setPatients(response.data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleAssignPatient = async () => {
    try {
      await DoctorService.selectPatient("6525afac114367999aba79df", selectedPatientId); 
    } catch (error) {
      console.error("Error assigning patient:", error.message);
    }
  };

  return (
    <div>
      <h2>List of Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.name}{" "}
            <button onClick={() => handlePatientSelect(patient._id)}>Select</button>
          </li>
        ))}
      </ul>

      {selectedPatientId && (
        <button onClick={handleAssignPatient}>Assign Selected Patient</button>
      )}
    </div>
  );
}

export default SelectPatientList;
