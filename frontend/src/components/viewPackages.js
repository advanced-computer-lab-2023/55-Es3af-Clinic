import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PackageService from "../services/packageService";

const PkgList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrievePkgs();
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
    </div>
  );

}
export default PkgList;