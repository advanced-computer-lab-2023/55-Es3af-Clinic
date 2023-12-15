import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
import Home from "../gohome";

const PrescriptionList = (props) => {
  const [loading, setLoading] = useState(false);
  const [prescriptions, setprescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);


  const showPrescriptionDetails = (prescription) => {
    if (selectedPrescription === prescription) {
      setSelectedPrescription(null); // Hide details if clicked again
    } else {
      setSelectedPrescription(prescription);
    }
  };

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    setLoading(true);
    PatientService.viewPrescriptions()
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setprescriptions(response.data);
        } else {
          // Handle the case where response.data is not an array
          console.log("Data is not an array:", response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const formatDateOfBirth = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
            <>
              {prescriptions.map((prescription) => (
                <div
                  className="card"
                  key={prescription._id}
                  style={{
                    width: 450,
                    backgroundColor: "#282c34",
                    margin: 10,
                  }}
                >
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                      <strong>{formatDateOfBirth(prescription.date)}</strong><br/>
                      <strong>By Doctor: </strong> {prescription.doctor.name}
                      {selectedPrescription === prescription._id && (
                        <ul>
                          {prescription.medicine.map((med, index) => (
                            <li key={index}>
                              <strong>Name:</strong> {med.medID.Name}<br/>
                              <strong>Dosage:</strong> {med.dosage}<br/>
                              <strong>Duration:</strong> {med.duration}
                              {index < prescription.medicine.length - 1 ? <hr/> : ""}
                            </li>
                          ))}
                        </ul>
                      )}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Status: {prescription.status}
                    </h3>
                    <button className="btn btn-primary" onClick={() => showPrescriptionDetails(prescription._id)}>
                    {selectedPrescription === prescription._id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <a
                  href="/patient/filterprescriptionsbydatestatusdoctor"
                  rel="noopener noreferrer"
                >
                  <button className="btn btn-primary">
                    Filter Prescriptions
                  </button>
                </a>{" "}
              </div>
            </>
          ) : (
            <div>
              <h2>No Prescriptions</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PrescriptionList;
