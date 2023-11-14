import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadMedicalHistory() {
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState([]);

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/patient/${username}`);
        setPatient(response.data); // Assuming the data contains the patient details
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [username]); 

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles(fileList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append('medicalHistory', files[i]);
      }
      try {
        await axios.post('http://localhost:8000/patient/uploadMedicalHistory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Medical history uploaded successfully');
      } catch (error) {
        alert('Error uploading medical history');
      }
    } else {
      alert('No files selected for upload.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="string"
              className="form-control"
              id="Username"
              name="Username"
              value={username}
              placeholder="Enter Username"
              onChange={handleUsernameChange}
            />
          </div>
          
          <div>
          <iframe src={`data:application/pdf;base64,${arrayBufferToBase64(patient.UploadMedicalHistory)}`}  width="800" height="600"></iframe>
                </div>

          <div className="form-group">
            <label htmlFor="InputImage">Upload Medical History Files</label>
            <input
              type="file"
              className="form-control"
              id="file"
              name="file"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload Medical History
          </button>
          <button type="submit" className="btn btn-primary">
            View Medical History
          </button>
        </form>
      </header>
    </div>
  );
}

export default UploadMedicalHistory;