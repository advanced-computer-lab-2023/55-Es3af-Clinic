import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import userService from "../services/userService";
import { useParams } from "react-router-dom";

function ResetPassword() {

  const initialUserState = {
    password: '',
    confirmPassword: ''
  }

  const { id } = useParams()

  const [password, setPassword] = useState(initialUserState)
  //const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [message2, setMessage2] = useState('')
  const [message3, setMessage3] = useState('')

  const handleInputChange = (event) => {
    const {name, value} = event.target
    if(name == 'password'){
      if (value.length < 6) {
        setMessage2('Password is too short');
      } else if (!/\d/.test(value)) {
        setMessage2('Password should contain at least one digit');
      } else if(!/[A-Z]/.test(value)){
        setMessage2('Password should contain at least one capital letters');
      }
      else {
        setMessage2('Password strength is good');
        //setPassword(value)
      }
    }
    if(name == 'confirmPassword'){
      if(value !== password.password){
        setMessage3('passwords does not match')
      }
      else setMessage3("you're good to go")
    }
    setPassword({...password, [name]: value})
  };

  async function resetPassword(){
    userService.resetPassword(password, id)
    .then((res) => {
      setMessage(res.data)
    })
    .catch((e) => {console.error(e)})
  }


  return (
    <div className="App">
      <header className="App-header">
          <div className="form-group">
            <label htmlFor="InputPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            ></input>
            <p style ={{color: 'red'}}>{message2}</p>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={password.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleInputChange}
            ></input>
            <p style ={{color: 'green'}}>{message3}</p>
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