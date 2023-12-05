import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import userService from "../services/userService";

function ResetPassword() {

  const initialUserState = {
    username: '',
    password: ''
  }

  const [user, setUser] = useState(initialUserState)
  const [message, setMessage] = useState('')
  const [message2, setMessage2] = useState('')

  const handleInputChange = (event) => {
    const {name, value} = event.target
    if(name === 'password'){
        if (value.length < 6) {
          setMessage2('Password is too short');
        } else if (!/\d/.test(value)) {
          setMessage2('Password should contain at least one digit');
        } else if(!/[A-Z]/.test(value)){
          setMessage2('Password should contain at least one capital letters');
        }
        else {
          setMessage2('Password strength is good');
        }
      }
    setUser({...user, [name]: value})
  };

  async function resetPassword(){
    userService.resetPassword(user)
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
            <label htmlFor="InputPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            ></input>
            <p style ={{color: 'red'}}>{message2}</p>
          </div>
          <button onClick={resetPassword} className="btn btn-primary">
            Update
          </button>
          <p style ={{color: 'white'}}>{message}</p>

      </header>
    </div>
  );
}

export default ResetPassword;