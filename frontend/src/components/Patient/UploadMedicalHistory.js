import React, { useState } from 'react';
import axios from 'axios';
import Home from '../gohome';

function UploadMedicalHistory() {
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
      <Home />
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
        </form>
      </header>
    </div>
  );
}

export default UploadMedicalHistory;