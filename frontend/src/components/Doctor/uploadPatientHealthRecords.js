import React, { useState } from 'react';
import axios from 'axios';

function UploadPatientHealthRecords() {
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState([]);

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
        await axios.post('http://localhost:8000/doctor/uploadHealthRec', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Health record uploaded successfully');
      } catch (error) {
        alert('Error uploading health record');
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
            <label htmlFor="InputUsername">Patient's Username</label>
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

          <div className="form-group">
            <label htmlFor="InputImage">Upload Health Record Files</label>
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
            Upload Health Records
          </button>
        </form>
      </header>
    </div>
  );
}

export default UploadPatientHealthRecords;