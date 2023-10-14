import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUser = (event) => {
    const { name } = event.target;
    UserService.deleteUser(name)
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
                    {user.username}
                  </h3>
                  <h3 className="card-title" style={{ color: "white" }}>
                    {user.__t}
                  </h3>
                  <button
                    style={{ backgroundColor: "red" }}
                    name={user._id}
                    onClick={(user) => deleteUser(user)}
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