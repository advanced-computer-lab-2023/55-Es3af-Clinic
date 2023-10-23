import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AdminService from "../../services/adminService";
import { useParams } from "react-router-dom";

function UpdatePassword() {
    //const temp = {password: ''};
    const { id } = useParams()

    var oldPassword = ''
    AdminService.getPassword(id)
    .then((res) => {
        oldPassword = res.data
        console.log(oldPassword)
    })
    .catch((err) => console.error(err))


    const [currPassword, setCurrPassword] = useState('')
    const [password,setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('')

    const handleInputChange = (event) => {
        setPassword(event.target.value)
        console.log('password is sent')
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
        if(currPassword !== oldPassword){
            setMessage2('current password is wrong')
        } else if(currPassword === oldPassword){
            setMessage2('Current password is correct')
        }
    }

    const updatePassword = () => {
        if(currPassword === '' || password === ''){
            setMessage('current password or new password are empty')
        } else {AdminService.updatePassword(id, password)}
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
                <p style={{ color: 'red' }}>{message}</p>
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
              <p style ={{color: 'white'}}>{message2}</p>
            </form>
          </header>
        </div>
    );
}

export default UpdatePassword