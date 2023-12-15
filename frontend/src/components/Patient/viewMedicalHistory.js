import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
import Home from "../gohome";

function ViewMedicalHistory() {
  const [loading, setLoading] = useState(false);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const [medicalHistory, setMedicalHistory] = useState([]);

  const fetchMedicalHistory = async () => {
    try {
      setLoading(true);
      const response = await PatientService.viewMedicalHistory();
      const medicalHistoryData = response.data.result;
      setMedicalHistory(medicalHistoryData);
    } catch (error) {
      console.error("Error fetching medical history:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMedicalHistory = async (medicalHistoryId) => {
    try {
      await PatientService.removeMedicalHistory(medicalHistoryId);
      // Refresh the medical history after removal
      fetchMedicalHistory();
    } catch (error) {
      console.error("Error removing medical history:", error.message);
    }
  };

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  return (
    <div className="App">
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
          </div>{" "}
        </div>
      ) : (
        <header className="App-header">
          <div>
            <h2>Medical History</h2>
            {medicalHistory.medicalHistoryPDF &&
              medicalHistory.medicalHistoryPDF.length > 0 && (
                <div>
                  <h3>PDF Files</h3>
                  <ul>
                    {medicalHistory.medicalHistoryPDF.map((pdf, index) => (
                      <li key={index}>
                        {pdf.name}
                        <iframe
                          src={`data:application/pdf;base64,${arrayBufferToBase64(
                            pdf.data.data
                          )}`}
                          width="800"
                          height="600"
                        ></iframe>
                        <button
                          onClick={() => handleRemoveMedicalHistory(pdf._id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {medicalHistory.medicalHistoryImage &&
              medicalHistory.medicalHistoryImage.length > 0 && (
                <div>
                  <h3>Image Files</h3>
                  <ul>
                    {medicalHistory.medicalHistoryImage.map((image, index) => (
                      <li key={index}>
                        {image.name}
                        <img
                          src={`data:${
                            image.contentType
                          };base64,${arrayBufferToBase64(image.data.data)}`}
                          alt={image.Name}
                          style={{
                            width: "200px",
                            height: "200px",
                            color: "white",
                          }}
                        />
                        <button
                          onClick={() => handleRemoveMedicalHistory(image._id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {(!medicalHistory.medicalHistoryPDF ||
              medicalHistory.medicalHistoryPDF.length === 0) &&
              (!medicalHistory.medicalHistoryImage ||
                medicalHistory.medicalHistoryImage.length === 0) && (
                <p>No medical history available.</p>
              )}
          </div>
        </header>
      )}
    </div>
  );
}

export default ViewMedicalHistory;
