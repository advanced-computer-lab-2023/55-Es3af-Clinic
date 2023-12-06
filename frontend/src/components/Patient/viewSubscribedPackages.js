import React, { useState, useEffect } from 'react';
import PatientService from '../../services/patientService';
import MemberService from "../../services/familyMemberService";
import { useNavigate } from "react-router-dom";

function ViewSubscribedPackagesPage() {
  const intialBody = {
    patients:[]
  };
  const [packages, setPackages] = useState([]);
  const [body,setBody]= useState(intialBody);
  const [showBanner, setShowBanner] = useState(false);
  const [members, setMembers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientService.viewSubscribedHealthPackages();
        setPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    retrieveMembers();
  }, []);
  const retrieveMembers = () => {
    MemberService.getAll()
        .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          const flattenedUsers = response.data.flat();
          setMembers(flattenedUsers);
        }
        else {
            // Handle the case where response.data is not an array
            console.log("Data is not an array:", response.data);
          }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const membersWithPackage = members.filter((member) => member.package);
  const handleCheckboxChange = (memberId) => {
    setBody((prevBody) => {
      const isChecked = prevBody.patients.includes(memberId);
  
      if (isChecked) {
        const updatedBody = {
          ...prevBody,
          patients: prevBody.patients.filter((id) => id !== memberId),
        };
        return updatedBody;
      } else {
        const updatedBody = {
          ...prevBody,
          patients: [...prevBody.patients, memberId],
        };
        return updatedBody;
      }
    });
  
  };
  const handleCancelPackage = async () => {
    try {
      // Assuming you have a service method to cancel the health package for a patient
      await PatientService.cancelPackageSubscirption(body).then((response)=>{
        alert(response.data)
      });
      window.location.reload();

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
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={() => setShowBanner(true)}>
                Cancel Health Package
              </button>
      </div>
      {showBanner && (
        <div className="overlay"></div>
      )}

      {showBanner && (
        <div className="member-banner">
            <div>
          {membersWithPackage.map((member) => (
            <label key={member.id} style={{ display: "block" }}>
              <input type="checkbox" value={member.name} checked={body.patients.includes(member._id)}
                onChange={() => handleCheckboxChange(member._id)}/> {member.name}
            </label>
          ))}
          </div>
          <div className="payment-buttons">
            <button className="btn btn-primary" onClick={()=>handleCancelPackage()}>Cancel Subscription</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSubscribedPackagesPage;
