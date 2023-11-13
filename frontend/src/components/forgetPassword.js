import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import userService from "../services/userService";

function ForgetPassword() {

  const initialUserState = {
    username: '',
    email: ''
  }

  const [user, setUser] = useState(initialUserState)
  const [message, setMessage] = useState('')

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  };

  async function forgetPassword(){
    console.log('userService')
    userService.forgetPassword(user)
    .then((res) => {
      setMessage(res.data)
    })
    .catch((e) => {console.error(e)})
  }


  return (
    <div className="App">
      <header className="App-header">

        <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={user.username}
              placeholder="Enter Username"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              placeholder="Enter Email"
              onChange={handleInputChange}
            ></input>
          </div>
          <button onClick={forgetPassword} className="btn btn-primary">
            Send
          </button>
          <p style ={{color: 'white'}}>{message}</p>

      </header>
    </div>
  );
}

export default ForgetPassword;