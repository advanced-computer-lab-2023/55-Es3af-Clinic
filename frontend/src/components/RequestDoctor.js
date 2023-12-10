import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationBackground: '',
    speciality: '',
  });

  const [fileData, setFileData] = useState({
    IDdoc: null,
    MedicalLicenses: [],
    MedicalDegree: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Password strength validation
    if (name === 'password') {
      if (value.length < 6) {
        setMessage('Password is too short');
      } else if (!/\d/.test(value)) {
        setMessage('Password should contain at least one digit');
      } else if (!/[A-Z]/.test(value)) {
        setMessage('Password should contain at least one capital letter');
      } else {
        setMessage('Password strength is good');
      }
    }

    // Update form data
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    const file = e.target.files[0];

    setFileData({
      ...fileData,
      [fieldName]: file,
    });
  };

  const handleMedicalLicensesChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      setFileData((prevFileData) => ({
        ...prevFileData,
        MedicalLicenses: [...prevFileData.MedicalLicenses, ...files],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Append form data fields
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      // Append IDdoc file
      if (fileData.IDdoc) {
        form.append('IDdoc', fileData.IDdoc);
      }

      // Append MedicalDegree file
      if (fileData.MedicalDegree) {
        form.append('MedicalDegree', fileData.MedicalDegree);
      }

      // Append multiple MedicalLicenses files
      for (const file of fileData.MedicalLicenses) {
        form.append('MedicalLicenses', file);
      }

      const response = await axios.post('http://localhost:8000/requestDoctor/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>

          {/* Add other form elements with similar styling as above */}

          <div className="form-group">
            <label htmlFor="IDdoc">ID Document</label>
            <input
              type="file"
              className="form-control"
              id="IDdoc"
              name="IDdoc"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="MedicalLicenses">Medical Licenses</label>
            <input
              type="file"
              className="form-control"
              id="MedicalLicenses"
              name="MedicalLicenses"
              onChange={handleMedicalLicensesChange}
              multiple
            />
          </div>

          <div className="form-group">
            <label htmlFor="MedicalDegree">Medical Degree</label>
            <input
              type="file"
              className="form-control"
              id="MedicalDegree"
              name="MedicalDegree"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </form>
      </header>
    </div>
  );
};

export default DoctorRegistration;
