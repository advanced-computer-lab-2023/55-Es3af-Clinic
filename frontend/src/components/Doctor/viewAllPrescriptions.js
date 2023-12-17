import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";
import Home from "../gohome";

const ViewAllPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDosage, setNewDosage] = useState({})

  useEffect(() => {
    retrievePrescriptions();
  }, []);

  const handleDownload = (data) => {
    var pdfData = `Patient name: ${data.patient}\nMedicines:\n`
    for(var med of data.prescriptions){
      pdfData += `-Name: ${med.name}\n--Dosage: ${med.dosage}\n--Duration: ${med.duration}\n`
    }
    pdfData+= `Status: ${data.status}`
    createAndDownloadPDF(pdfData)
  }

  const createAndDownloadPDF = async (data) => {
    const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
  
    // Set up font and text
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    //const text = JSON.stringify(data); // Add your desired data here
    const lines = data.split('\n');
    let y = page.getHeight() - 4 * fontSize;
    for (const line of lines) {
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0), // Black color
      });
  
      // Adjust the y-coordinate for the next line
      y -= 1.5 * fontSize; // You can adjust the spacing as needed
    }
  
    // Add text to the page
    // page.drawText(text, {
    //   x: 50,
    //   y: page.getHeight() - 4 * fontSize,
    //   size: fontSize,
    //   font,
    //   color: rgb(0, 0, 0), // Black color
    // });
  
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
  
    // Create a Blob containing the PDF data
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Prescription.pdf'; // Set the file name here
  
    // Append the link to the body
    document.body.appendChild(link);
  
    // Simulate a click on the link to trigger download
    link.click();
  
    // Remove the link from the body
    document.body.removeChild(link);
  
    // Free the URL object
    URL.revokeObjectURL(url);
  }

  const retrievePrescriptions = () => {
    setLoading(true);
    DoctorService.getAllPrescriptions()
      .then((response) => {
        console.log(response);
        if (response.length !== 0) {
          setPrescriptions(response.data.prescriptions);
          console.log(prescriptions)
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
      const newDosageNew = prompt("Enter the new dosage:");
      if (newDosageNew !== null) {
       

        const newDose = {
          prescriptionId: prescriptionId,
          medicineId: medicineId,
          newDosage: newDosageNew
        }
        setNewDosage(newDose)
  
        
  
        //retrievePrescriptions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calling = async () => {
    const response = await DoctorService.editDosage(newDosage);
    //console.log(response.data.message);
  }

  useEffect(() => {
    if(Object.keys(newDosage).length > 0){
      calling()
    }
  }, [newDosage])
  
  const handleEditPrescription = async (prescriptionId) => {
    try {
      const prescriptionToUpdate = prescriptions.find(
        (prescription) => prescription.id === prescriptionId
      );

      if (prescriptionToUpdate.status === "filled") {
        // Prescription is already filled, display message
        alert("You cannot edit this prescription as it is filled");
      } else {
        // Prescription is not filled, proceed with edit
        // Call the backend method to update prescription with ID: prescriptionId
        const response = await DoctorService.editPrescription(prescriptionId);
        // Handle success response
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
                <div
                  className="card"
                  key={prescriptionIndex}
                  style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                >
                  <div className="card-body">
                    <h3 style={{ color: "white" }}>Patient: {prescription.patient}</h3>
                    <div className="medicine-details" style={{ color: "white" }}>
                      <ul>
                        {prescription.prescriptions.map((medicine, i) => (
                          <li key={i}>
                            {/* Display medicine details */}
                            {medicine.medID && (
                              <div>
                                <strong>Name: </strong> {medicine.medID.Name}<br />
                              </div>
                            )}                            
                            <strong>Dosage: </strong> {medicine.dosage}<br />
                            <strong>Duration: </strong> {medicine.duration}<br />
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEditDosage(prescription.id, medicine.medID._id)}
                            >
                              Edit Dosage
                            </button>
                            {i < prescription.prescriptions.length - 1 ? <hr /> : ""}
                          </li>
                        ))}
                        {/* Button to download prescription */}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleDownload(prescription)}
                        >
                          Download
                        </button>
                        {/* Button to edit prescription */}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditPrescription(prescription.id)}
                        >
                          Edit Prescription
                        </button>
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
