import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AdminService from "../../services/adminService";
import Home from "../gohome";

function DeleteAdmin() {
  const initialUserState = {
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  async function deleteUser(e) {
    const {value} = e.target
    e.preventDefault();
    console.log(value)
    AdminService.deleteUser(value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <form className="App-header" >
          <div className="form-group">
            <label htmlFor="InputId">User ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={user.id}
              placeholder="Enter user ID to delete"
              onChange={handleInputChange}
            ></input>
          </div>

          <button className="btn btn-danger" onClick={(user) => deleteUser(user)}
value={user.id}>
            Delete User
          </button>
        </form>
      </header>
    </div>
  );
}

export default DeleteAdmin;
