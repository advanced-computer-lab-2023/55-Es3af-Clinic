import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AdminService from "../services/adminService";

function DeleteAdmin() {
  const initialUserState = {
    username: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  async function deleteAdmin(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    AdminService.deleteAdmin(user.username)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={deleteAdmin}>
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={user.username}
              placeholder="Enter username to delete"
              onChange={handleInputChange}
            ></input>
          </div>

          <button type="submit" className="btn btn-danger">
            Delete Admin
          </button>
        </form>
      </header>
    </div>
  );
}

export default DeleteAdmin;
