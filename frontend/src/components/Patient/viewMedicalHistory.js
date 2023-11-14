// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const ViewMedicalHistory = () => {

//     function arrayBufferToBase64(buffer) {
//         let binary = '';
//         const bytes = new Uint8Array(buffer);
//         const len = bytes.byteLength;
      
//         for (let i = 0; i < len; i++) {
//           binary += String.fromCharCode(bytes[i]);
//         }
//     }
//   const [medicalHistory, setMedicalHistory] = useState({ medicalHistoryPDF: [], medicalHistoryImage: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('jwt'); // Assuming you store the JWT in localStorage
//         const response = await axios.get('http://localhost:8000/patient/viewMedicalHistory', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = response.data.result;
//         setMedicalHistory(data);
//       } catch (error) {
//         console.error('Error fetching medical history:', error.message);
//       }
//     };

//     fetchData();

    


// }, []); // Empty dependency array ensures the effect runs once on component mount


  
//   return (

//     <div>
//                 <h1>My Health Records</h1>
//                 <h2>Health Records</h2>
//                 {userHealthRecord.map((record, index) => (
//                     <div key={index}>
//                         <h3>Record {index + 1}</h3>
//                         {console.log(record?.data)}
//                         <iframe src={`data:application/pdf;base64,${arrayBufferToBase64(record?.data)}`}  width="800" height="600"></iframe>
                        
//                         {/* Add any other fields you want to display */}
//                     </div>
//                 ))}
//                 <h2>Medical History</h2>
//                 <h3>Add medical history</h3>
//                 <Form.Group controlId="formFile" className="mb-3">
//     <Form.Label>Default file input example</Form.Label>
//     <Form.Control type="file" onChange={handleFileChange} />
//   </Form.Group>

//   <Button variant="primary" onClick={handleSubmit}>
//     Submit
//   </Button>
//   <br></br>

//                 {userHealthHistoryPDF.map((record, index) => (
//                     <div key={index}>
//                         <h3>Record {index + 1}</h3>
//                         <button onClick={() => deleteRecord(record._id)}>Delete</button><br></br>

//                      {console.log(record)}   
//                      <iframe src={`data:application/pdf;base64,${arrayBufferToBase64(record.data.data)}`}  width="800" height="600"></iframe>
//                         {/* Add any other fields you want to display */}

//                     </div>
//                 ))}
//                 {userHealthHistoryIMG.map((record, index) => (
//                     <div key={index}>
//                         <h3>Record {index + 1}</h3>
//                         <button onClick={() => deleteRecord(record._id)}>Delete</button><br></br>

//                      {console.log(record)}   
//                      <img
//                       src={`data:image/jpeg;base64,${arrayBufferToBase64(record.data.data)}`}
                      
//                   />

//                         {/* Add any other fields you want to display */}
//                     </div>
//                 ))}
               

        

//     </div>
// );
// };

// export default ViewMedicalHistory;