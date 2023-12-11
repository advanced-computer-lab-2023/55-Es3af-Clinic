import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";
import { Route } from "react-router-dom";




const MyPatientList = (props) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    DoctorService.getAllMyPatients()
      .then((response) => {
        // console.log(response.data);
        if (Array.isArray(response.data.data.patients)) {
          setPatients(response.data.data.patients);
        } 
        // else {
        //   console.log("Data is not an array:", response.data);
        // }
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

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const viewDets = (patient) => {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = `
      <div>
        <div className="App-header">
          <div
            className="card"
            key=${patient._id}
            style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
          >
            <div className="card-body">
              <h3 className="card-title" style={{ color: "white" }}>
                Name: ${patient.name}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Email: ${patient.email}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Date Of Birth: ${formatDateOfBirth(patient.dateOfBirth)}
              </h3> 
              <h3 className="card-title" style={{ color: "white" }}>
                Gender: ${patient.gender}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Mobile: ${patient.mobile}
              </h3>
              ${
                patient.emergencyContact
                  ? `
                    <h3 className="card-title" style={{ color: "white" }}>
                      Emergency Contact: ${patient.emergencyContactName} - ${patient.emergencyContactMobile}
                    </h3>
                  `
                  : ''
              }
              <h3 className="card-title" style={{ color: "white" }}>
                Package: ${patient.package}
              </h3> 
            </div>
          </div>
        </div>
      </div>
    `;
  };


 const viewMedicalHistory = async (patient) => {
  // Extract medical history from the patient object
  try {
    const response = await DoctorService.viewHealthRecords(patient);
    const medicalHistoryData = response.result;
    console.log(response.result)
    setMedicalHistory(medicalHistoryData);
    viewHist();
  } catch (error) {
    console.error('Error fetching medical history:', error.message);
  }

}

  // Render the view after fetching the medical history
  const viewHist = () => {
    console.log(medicalHistory)
  const contentContainer = document.getElementById('contentContainer');
  contentContainer.innerHTML = `
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Medical History</h2>
          ${medicalHistory.medicalHistoryPDF.length > 0 && (
            `<div>
              <h3>PDF Files</h3>
              <ul>
                ${medicalHistory.medicalHistoryPDF.map((pdf, index) => (
                  `<li key=${index}>
                    ${pdf.name}
                    <iframe src="data:application/pdf;base64,${arrayBufferToBase64(pdf.data.data)}"  width="800" height="600"></iframe>
                  </li>`
                )).join('')}
              </ul>
            </div>`
          )}
  
          ${medicalHistory.medicalHistoryImage.length > 0 && (
            `<div>
              <h3>Image Files</h3>
              <ul>
                ${medicalHistory.medicalHistoryImage.map((image, index) => (
                  `<li key=${index}>
                    ${image.name}
                    <img
                      src="data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}"
                      alt=${image.Name} 
                      style={{ width: "200px", height: "200px", color: "white" }}
                    />
                  </li>`
                )).join('')}
              </ul>
            </div>`
          )}

          ${medicalHistory.medicalHistoryPDF.length === 0 && medicalHistory.medicalHistoryImage.length === 0 && (
            `<p>No medical history available.</p>`
          )}
        </div>
      </header>
    </div>
  `;
};

  

  // const scheduleFollowUpAppointment = async () => {
  //   try {
  //     const patientName = document.getElementById('patientName').value;
  //     const selectedDate = document.getElementById('selectedDate').value;

  
  //     // Check if both fields are filled
  //     if (!patientName || !selectedDate) {
  //       alert('Please enter both the patient name and select a date.');
  //       return;
  //     }
  
  //     // Call the DoctorService function to schedule the follow-up appointment
  //     const response = await DoctorService.scheduleFollowUpAppointment({
  //       patientName,
  //       date: selectedDate,
  //       // Other necessary data can be added here if required
  //     });
  
  //     // Handle the response as needed (e.g., display success message)
  //     console.log(response); // Log the response or perform actions based on the response
  
  //     // Clear the input fields or perform other actions after scheduling the appointment
  //     document.getElementById('patientName').value = '';
  //     document.getElementById('selectedDate').value = '';
  //   } catch (error) {
  //     // Handle errors, e.g., display an error message
  //     console.error('Error scheduling follow-up appointment:', error.message);
  //     // Display an error message or perform other error handling
  //   }
  // };

  // const nameAndDate = (patient) => {
  //   const contentContainer = document.getElementById('contentContainer');
  //   contentContainer.innerHTML = `
  //     <div>
  //       <div className="App-header">
  //         <div className="card" style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}>
  //           <div className="card-body">
  //             <h3 className="card-title" style={{ color: "white" }}>Enter Patient Name:</h3>
  //             <input type="text" id="patientName" placeholder="Patient Name" style={{ marginBottom: "10px" }}>
              
  //             <h3 className="card-title" style={{ color: "white" }}>Select Date:</h3>
  //             <input type="date" id="selectedDate" style={{ marginBottom: "10px" }}>
              
  //             <button onClick={scheduleFollowUpAppointment} style={{ backgroundColor: "green", color: "white", padding: "8px 12px" }}>Schedule Follow-up Appointment</button>

  //         </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // };


  return (
    <div>
      <div className="App-header" id="contentContainer">
      {loading ? (
          <h2>Loading...</h2>
        ) : patients.length > 0 ? (
          patients.map((patient) => {
            return (
              <div
                className="card"
                key={patient._id}
                style={{ width: 550, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                    Name: {patient.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender: {patient.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Mobile: {patient.mobile}
                  </h3>
                  <button
                    className="btn btn-primary"
                    id="updateButton"
                    onClick={() => viewDets(patient)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary"
                    id="viewMedicalHistoryButton"
                    onClick={() => viewMedicalHistory(patient._id)}
                  >
                    View Medical History
                  </button>
                  <a href={`/doctor/addPrescription/${patient._id}`} rel="noopener noreferrer">
                    <button className="btn btn-primary">Add Prescription</button>
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Patients</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPatientList;