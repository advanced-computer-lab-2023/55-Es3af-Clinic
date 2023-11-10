import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import AdminService from "../../services/adminService";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    AdminService.listUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false); 
      });
  };

  const deleteUser = (event) => {
    const { name } = event.target;
    AdminService.deleteUser(name)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="App-header">
        <button
          style={{ backgroundColor: "green", marginBottom: "10px" }}
          onClick={retrieveUsers}
        >
          Refresh Users
        </button>
        {loading ? (
          <p>Loading...</p>
       ) : users.length > 0 ? (
            users.map((user) => {
              return (
                <div
                  className="card"
                  key={user._id}
                  style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                >
                  <div className="card-body">
                    <h3 className="card-title" style={{ color: "white" }}>
                      {user.username}
                    </h3>
                    <h3 className="card-title" style={{ color: "white" }}>
                      {user.__t}
                    </h3>
                    <button
                      style={{ backgroundColor: "red" }}
                      name={user._id}
                      onClick={() => deleteUser(user._id)} // Pass user._id directly
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h2>No users</h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default UsersList;
