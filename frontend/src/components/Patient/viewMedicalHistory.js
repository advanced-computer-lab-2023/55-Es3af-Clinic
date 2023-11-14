import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";

function ViewMedicalHistory() {

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
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
        const response = await PatientService.viewMedicalHistory();
        const medicalHistoryData = response.data.result;
        setMedicalHistory(medicalHistoryData);
      } catch (error) {
        console.error('Error fetching medical history:', error.message);
      }
    };
  
    const handleRemoveMedicalHistory = async (medicalHistoryId) => {
      try {
        await PatientService.removeMedicalHistory(medicalHistoryId);
        // Refresh the medical history after removal
        fetchMedicalHistory();
      } catch (error) {
        console.error('Error removing medical history:', error.message);
      }
    };
  
    useEffect(() => {
      fetchMedicalHistory();
    }, []);

    return (
        <div className="App">
        <header className="App-header">
        <div>
          <h2>Medical History</h2>
          {medicalHistory.medicalHistoryPDF && medicalHistory.medicalHistoryPDF.length > 0 && (
            <div>
              <h3>PDF Files</h3>
              <ul>
                {medicalHistory.medicalHistoryPDF.map((pdf, index) => (
                  <li key={index}>
                    {pdf.name}
                    <iframe src={`data:application/pdf;base64,${arrayBufferToBase64(pdf.data.data)}`}  width="800" height="600"></iframe>
                    <button onClick={() => handleRemoveMedicalHistory(pdf._id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
      
          {medicalHistory.medicalHistoryImage && medicalHistory.medicalHistoryImage.length > 0 && (
            <div>
              <h3>Image Files</h3>
              <ul>
                {medicalHistory.medicalHistoryImage.map((image, index) => (
                  <li key={index}>
                    {image.name}
                    <img
                    src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                    alt={image.Name} 
                    style={{ width: "200px", height: "200px",color: "white" }}
                  />
                    <button onClick={() => handleRemoveMedicalHistory(image._id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(!medicalHistory.medicalHistoryPDF || medicalHistory.medicalHistoryPDF.length === 0) &&
            (!medicalHistory.medicalHistoryImage || medicalHistory.medicalHistoryImage.length === 0) && (
              <p>No medical history available.</p>
          )}
        </div>
      </header>
    </div>
      );
  }

export default ViewMedicalHistory;
