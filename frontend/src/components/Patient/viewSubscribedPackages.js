import React, { useState, useEffect } from 'react';
import PatientService from '../../services/patientService';

function ViewSubscribedPackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientService.viewSubscribedHealthPackages('SaraWasfy');
        setPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCancelPackage = async (patientId) => {
    try {
      // Assuming you have a service method to cancel the health package for a patient
      await PatientService.cancelHealthPackageForPatient(patientId);
      // Refresh the package list after cancellation
      const response = await PatientService.viewSubscribedHealthPackages('SaraWasfy'); //I think this should be the patient ID instead of the username
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <div className="App-header">
        <h2>Subscribed Health Packages</h2>
        <ul>
          {packages.map((pkg, index) => (
            <li key={index}>
              <strong>{pkg.patientName}</strong>
              <p>Package: {pkg.package}</p>
              <p>Status: {pkg.status}</p>
              <p>Renewal Date: {pkg.renewalDate}</p>
              <button className="btn btn-primary" onClick={() => handleCancelPackage(pkg.patientId)}>
                Cancel Health Package
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewSubscribedPackagesPage;
