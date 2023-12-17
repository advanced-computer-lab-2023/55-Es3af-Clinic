import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
import Home from "../gohome";

const PrescriptionList = (props) => {
  const intialItems = {
    lineItems: [
      {
        quantity: 1,
        price_data: {
          currency: "egp",
          product_data: {
            name: "",
          },
          unit_amount: 0,
        },
      },
    ],
    success_url: "",
    cancel_url: "",
  };
  const intialBody = {
    p: "",
  };
  const [body, setBody] = useState(intialBody);
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [prescriptions, setprescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [cBody, setCBody] = useState(intialItems);

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


  const handleDownload = (data) => {
    var pdfData = `Doctor name: ${data.doctor.name}            Date: ${formatDateOfBirth(data.date)}\nMedicines:\n`
    for(var med of data.medicine){
      pdfData += `-Name: ${med.medID.name}\n--Dosage: ${med.dosage}\n--Duration: ${med.duration}\n`
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
  const handlePay = async (presID) => {
    setBody((prevBody) => {
      const updatedBody = {
        ...prevBody,
        p: presID,
      };
      return updatedBody;
    });
    console.log(body.p);
    setShowBanner(true);
  };
  async function subscribe(e) {
    e.preventDefault();
    console.log(body.p);

    if (body.p !== "") {
      try {
        setLoading(true);
        const response = await PatientService.payForPres(body.p).finally(() => {
          setLoading(false);
        });
        alert(response.data);
        window.location.reload();
      } catch (e) {
        console.error(e);
        // Handle errors if necessary
      }
    } else {
      console.error("Prescription ID is empty");
    }
  }

  async function payWithCredit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/patient/payForPres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse); // Log the error details
        return;
      }

      const jsonResponse = await response.json();
      const { url } = jsonResponse;
      window.location = url;
    } catch (e) {
      console.log(e);
    }
  }
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
                      {/* {console.log(prescription)} */}
                      <strong>{formatDateOfBirth(prescription.date)}</strong>
                      <br />
                      <strong>By Doctor: </strong> {prescription.doctor.name}
                      {selectedPrescription === prescription._id && (
                        <ul>
                          {prescription.medicine.map((med, index) => (
                            <li key={index}>
                              <strong>Name:</strong> {med.medID.Name}
                              <br />
                              <strong>Dosage:</strong> {med.dosage}
                              <br />
                              <strong>Duration:</strong> {med.duration}
                              {index < prescription.medicine.length - 1 ? (
                                <hr />
                              ) : (
                                ""
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      Status: {prescription.status}
                    </h3>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPrescriptionDetails(prescription._id)}
                    >
                      {selectedPrescription === prescription._id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                    <button className="btn btn-primary" onClick={() => handleDownload(prescription)}>Download</button>
                    {prescription.status === "unfilled" && (
                      <div
                        className="cont"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn btn-primary"
                          style={{
                            right: "2px",
                            backgroundColor: "green",
                            border: "none",
                          }}
                          onClick={() => handlePay(prescription._id)}
                        >
                          Pay
                        </button>
                      </div>
                    )}
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
      {showBanner && <div className="overlay"></div>}

      {showBanner && (
        <div className="member-banner">
          <div className="close-icon" onClick={() => setShowBanner(false)}>
            &times; {/* Unicode "times" character (×) */}
          </div>
          <div className="payment-buttons">
            <button className="btn btn-primary" onClick={(e) => subscribe(e)}>
              Pay Using Wallet
            </button>
            <button className="btn btn-primary" onClick={payWithCredit}>
              Pay Using Credit Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PrescriptionList;
