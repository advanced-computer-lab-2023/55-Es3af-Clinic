import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

function Login(props) {
  const initialUserState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  let navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    UserService.login(user)
      .then((response) => {
        
        switch (response.data.__t) {
          
          case "pharmacist":
            navigate("../pharmacist", { replace: true });
            break;
          case "patient":
            navigate("../patient", { replace: true });
            break;
          default:
            navigate("../admin", { replace: true });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className="App-header">
        <form className="App-header" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={user.username}
              placeholder="Enter username"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleInputChange}
            ></input>
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <a href="/requestDoctor" rel="noopener noreferrer">
            Request as a Doctor
          </a>
          <a href="/register" rel="noopener noreferrer">
            Register as Patient
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
