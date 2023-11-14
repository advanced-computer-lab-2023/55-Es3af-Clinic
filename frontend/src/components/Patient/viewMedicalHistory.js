import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";

function ViewMedicalHistory() {
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
        <div>
          <h2>Medical History</h2>
          {medicalHistory.medicalHistoryPDF && medicalHistory.medicalHistoryPDF.length > 0 && (
            <div>
              <h3>PDF Files</h3>
              <ul>
                {medicalHistory.medicalHistoryPDF.map((pdf, index) => (
                  <li key={index}>
                    {pdf.name}
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
      );
  }

export default ViewMedicalHistory;
