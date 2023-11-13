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
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default ViewSubscribedPackagesPage;