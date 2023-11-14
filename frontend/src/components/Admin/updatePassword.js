import React, { useState, useEffect } from "react";
import AdminService from "../../services/adminService";
import { useParams } from "react-router-dom";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  //const { id } = useParams();

  useEffect(() => {
    // Fetch the old password when the component mounts
    AdminService.getPassword()
      .then((res) => {
        setOldPassword(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
    // Rest of your validation logic
  };

  const handleInputChange2 = (event) => {
    setCurrPassword(event.target.value);
    // Rest of your validation logic
  };

  const updatePassword = () => {
    if (currPassword === "" || password === "") {
      setMessage("Current password or new password are empty");
    } else {
      AdminService.updatePassword(password);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={updatePassword}>
          <div className="form-group">
            <label htmlFor="Name">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currPassword"
              value={currPassword}
              placeholder="Enter Current Password"
              onChange={handleInputChange2}
            ></input>
            <label htmlFor="Name">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={password}
              placeholder="Enter new Password"
              onChange={handleInputChange}
            ></input>
            <p style={{ color: "red" }}>{message}</p>
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
          <p style={{ color: "white" }}>{message2}</p>
        </form>
      </header>
    </div>
  );
}

export default UpdatePassword;
