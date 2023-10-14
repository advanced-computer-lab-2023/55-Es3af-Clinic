import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import UserService from "../services/adminService";
import adminService from "../services/adminService";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    adminService.listUsers("faraaaah3")
        .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
            setUsers(response.data);
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
          users.map((user) => {
            return (

              <div
                className="card"
                key={user._id}
                style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
              >
                
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "white" }}>
                   Name: {user.name}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                  Speciality:  {user.speciality}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Hourly Rate: {user.price}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Doctors</h2>
          </div>
        )}
      </div>
    </div>
  );

}
export default DoctorsList;