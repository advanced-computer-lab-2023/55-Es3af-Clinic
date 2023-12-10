import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";

const ViewAllPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrievePrescriptions();
  }, []);

  const retrievePrescriptions = () => {
    DoctorService.getAllPrescriptions()
      .then((response) => {
        console.log(response);
        if (Array.isArray(response.data.prescriptions)) {
          setPrescriptions(response.data.prescriptions);
        } else {
          console.log("Data is not an array:", response);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>All Prescriptions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : prescriptions.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <div key={index} className="prescription-container">
            <h3>Patient: {prescription.patient}</h3>
            <div className="medicine-details">
              {prescription.prescriptions.map((medicine, i) => (
                <div key={i} className="medicine">
                  <h4>Medicine Name: {medicine.name}</h4>
                  <p>Dosage: {medicine.dosage}</p>
                  <p>Duration: {medicine.duration}</p>
                  <p>Status: {medicine.filled}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No prescriptions found for this doctor.</p>
      )}
    </div>
  );
};

export default ViewAllPrescriptions;
