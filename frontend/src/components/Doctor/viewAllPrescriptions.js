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
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Home />
      {loading ? (
        <div class="preloader">
          <div class="loader">
            <div class="loader-outter"></div>
            <div class="loader-inner"></div>

            <div class="indicator">
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
        <div className="App-header">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div
                className="card"
                key={index}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  {" "}
                  <h3 style={{ color: "white" }}>
                    Patient: {prescription.patient}
                  </h3>
                  <div className="medicine-details">
                    {prescription.prescriptions.map((medicine, i) => (
                      <div key={i} className="medicine">
                        <h4 style={{ color: "white" }}>
                          Medicine Name: {medicine.name}
                        </h4>
                        <p style={{ color: "white" }}>
                          Dosage: {medicine.dosage}
                        </p>
                        <p style={{ color: "white" }}>
                          Duration: {medicine.duration}
                        </p>
                        <p style={{ color: "white" }}>
                          Status: {medicine.filled}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No prescriptions found for this doctor.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAllPrescriptions;
