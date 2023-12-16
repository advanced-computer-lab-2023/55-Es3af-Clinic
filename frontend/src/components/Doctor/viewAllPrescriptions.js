import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";
import Home from "../gohome";

const ViewAllPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrievePrescriptions();
  }, []);

  const retrievePrescriptions = () => {
    setLoading(true);
    DoctorService.getAllPrescriptions()
      .then((response) => {
        console.log(response);
        if (response.length !== 0) {
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

  const handleEditDosage = async (prescriptionId, medicineId) => {
    try {
      const newDosage = prompt("Enter the new dosage:");
      if (newDosage !== null) {
        console.log('Prescription ID:', prescriptionId);
        console.log('Medicine ID:', medicineId);
        console.log('New Dosage:', newDosage);
  
        const response = await DoctorService.editDosage(prescriptionId, medicineId, newDosage);
        console.log(response.data.message);
  
        retrievePrescriptions();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Home />
      {loading ? (
        <div className="preloader">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>

            <div className="indicator">
              <svg width="16px" height="12px">
                <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="App-header">
        {prescriptions.length > 0 ? (
           prescriptions.map((prescription, prescriptionIndex) => (
              <div className="card" key={prescriptionIndex} style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Patient: {prescription.patient}</h3>
                  <div className="medicine-details" style={{ color: "white" }}>
                    <ul>
                      {prescription.prescriptions.map((medicine, i) => (
                        <li key={i}>
                          <strong>Name: </strong> {medicine.name}<br />
                          <strong>Dosage: </strong> {medicine.dosage}<br />
                          <strong>Duration: </strong> {medicine.duration}<br />
                          <button onClick={() => handleEditDosage(prescription._id, medicine.medID)}>Edit Dosage</button>
                          {i < prescription.prescriptions.length - 1 ? <hr /> : ""}
                        </li>
                      ))}
                    </ul>
                    <strong>Status: </strong> {prescription.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You haven't written any prescriptions yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAllPrescriptions;
