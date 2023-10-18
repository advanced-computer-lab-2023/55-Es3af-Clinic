import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import MemberService from "../../services/familyMemberService";

const MembersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    MemberService.getAll("farouhaTe3bet")
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
                  National ID:  {user.nationalID}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Age: {user.age}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Gender: {user.gender}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    Relation To Patient: {user.relationToPatient}
                  </h3> 
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Family Members</h2>
          </div>
        )}
      </div>
    </div>
  );

}
export default MembersList;