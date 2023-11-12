import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
//import {emailjs} from 'emailjs'

function ForgetPassword() {
  const initialUserState = {
    username: "",
    email: "",
  };
  const serviceID = 'service_8ht1wpv'
  const templateID = 'template_7tsjw36'

  const [user, setUser] = useState(initialUserState);
  const [message, setMessage] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  //let navigate = useNavigate();

  async function forgetPassword(e) {
    e.preventDefault();
    userService.forgetPassword(user)
    .then((res) => {
        if(res.data){
            console.log(res.data)
            setMessage('An email is sent with the new password')
            // var template_params = {
            //     to_name: user.name,
            //     email: user.email
            // }
            // console.log(template_params)
            // emailjs.send(serviceID, templateID, template_params)
            // .then((result) => {
            // console.log('email is sent el mafrood')
            // })
        }
        else{
            setMessage('Username or Email is incorrect')
        }
    })
  }

  return (
    <div>
      <div className="App-header">
        <form className="App-header" onSubmit={forgetPassword}>
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
            <label htmlFor="InputEmail">Email</label>
            <input
              type="string"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={handleInputChange}
            ></input>
          </div>

          <button className="btn btn-primary" type="submit">
            Send
          </button>
          <p style={{ color: 'red' }}>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
