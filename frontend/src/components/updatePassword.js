import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import UserService from "../services/userService";
import { useParams } from "react-router-dom";
//import bcrypt from "bcrypt";


function UpdatePassword() {
    let initialPasswords = {
        oldPassword : '',
        newPassword : ''
    };



    const currentURL = window.location.href
    //console.log(currentURL)
    const parts = currentURL.split('/')
    //console.log(parts)
    var userType = parts[3]
    //console.log(userType)
    //if(userType == 'admin') userType = 'user'

    const [currPassword, setCurrPassword] = useState('')
    const [password,setPassword] = useState('')
    const [passwords, setPasswords] = useState(initialPasswords)
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('')

    const handleInputChange = (event) => {
        setPassword(event.target.value)
        passwords.newPassword = password
        //console.log('password is sent')
        if (password.length < 6) {
            setMessage('Password is too short');
          } else if (!/\d/.test(password)) {
            setMessage('Password should contain at least two digit');
          } else if(!/[A-Z]/.test(password)){
            setMessage('Password should contain at least two capital letters');
          } else if(currPassword === password){
            setMessage('same password, choose a new one')
          }
          else {
            setMessage('Password strength is good');
          }
    }

    const handleInputChange2 = (event) => {
        setCurrPassword(event.target.value)
        //console.log('handel input current')
    }

    const updatePassword = () => {
        if(currPassword === '' || password === ''){
            setMessage('current password or new password are empty')
        } else {
          setPasswords({oldPassword: currPassword, newPassword: password})
          //console.log(currPassword)
            // UserService.updatePassword(passwords, userType)
            // .then((res) =>{
            //     //console.log(res.data)
            //     setMessage2(res.data)
            // })
        }
    };
    useEffect(() => {
      //console.log(passwords)
      if(currPassword == '') setMessage2('')
      else{
        UserService.updatePassword(passwords, userType)
        .then((res) =>{
            //console.log(res.data)
            setMessage2(res.data)
        })
    }

    }, [passwords])

    return (
        <div className="App">
          <header className="App-header">
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
                <p style={{ color: 'red' }}>{message}</p>
              </div>
              <br></br>
              <button onClick={updatePassword} className="btn btn-primary">
                Confirm
              </button>
              <p style ={{color: 'white'}}>{message2}</p>
          </header>
        </div>
    );
}

export default UpdatePassword