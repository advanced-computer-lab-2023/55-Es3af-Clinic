import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PackageService from "../../services/packageService";
import MemberService from "../../services/familyMemberService";
import patientService from "../../services/patientService";

const PkgListP = (props) => {
  const intialBody = {
    packageID:"",
    patients:["654bed1dbe07a9603f5b4030"]
  };
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [body,setBody]= useState(intialBody);
    const [showBanner, setShowBanner] = useState(false);
  
    useEffect(() => {
      retrievePkgs();
      retrieveMembers();
    }, []);

  const retrievePkgs = () => {
    PackageService.viewPackages()
        .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
            const sortedPackages = response.data.sort((a, b) => a.price - b.price);
            setUsers(sortedPackages);
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

  const retrieveMembers = () => {
    MemberService.getAll("farouhaTe3bet")
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
  const handleSubscribeClick = (userId) => {
    setBody((prevBody) => ({
      ...prevBody,
      packageID: userId,
    }));
    setShowBanner(true); 
  };
  const membersWithPackage = members.filter((member) => member.package);
  const handleCheckboxChange = (memberId) => {
    const isChecked = body.patients.includes(memberId);
  
    if (isChecked) {
      setBody({
        ...body,
        patients: body.patients.filter((id) => id !== memberId),
      });
    } else {
      setBody({
        ...body,
        patients: [...body.patients, memberId],
      });
    }
  };
  async function subscribe(e){
    e.preventDefault();
    patientService.subscribeToAHealthPackage(body).then((response) => {
      console.log(response.data);
      console.log(body.patients);
      alert(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  return (
    <div>
      <div className="App-header">
        {users.length > 0 ? (
          users.map((user) => { const sessionDiscountPercentage = user.sessionDiscount * 100;
            const medicationDiscountPercentage = user.medicationDiscount * 100;
            const familyMemberDiscountPercentage = user.familyMemberDiscount * 100;

            return (
              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                <div className="card-body">
                  <h3 className="card-title" style={{ color: `${user.type}` }}>
                    {user.type} Package
                  </h3>
                  <h4 className="card-title" style={{ color: "white" }}>
                    {sessionDiscountPercentage}% Session Discount
                  </h4>
                  <h4 className="card-title" style={{ color: "white" }}>
                    {medicationDiscountPercentage}% Medication Discount
                  </h4>
                  <h4 className="card-title" style={{ color: "white" }}>
                    {familyMemberDiscountPercentage}% Family Member Discount
                  </h4>
                  <h4 className="card-title" style={{ color: "white" }}>
                    Price: {user.price} EGP
                  </h4> 
                  <button className = "btn btn-primary" onClick={() => handleSubscribeClick(user._id)}>Subscribe</button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Packages Available</h2>
          </div>
        )}
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
            <button className="btn btn-primary" onClick={subscribe}>Pay Using Wallet</button>
            <button className="btn btn-primary">Pay Using Credit Card</button>
          </div>
        </div>
      )}
    </div>
  );

}
export default PkgListP;