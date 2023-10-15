import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PackageService from "../services/packageService";

function DeletePackage() {
  const initialUserState = {
    id: "",
  };

  const [pack, setPack] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPack({ ...pack, [name]: value });
  };

  async function deletePackage(e) {
    const {value} = e.target
    e.preventDefault();
    console.log(value)
    PackageService.deletePackage(value)
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
        <form className="App-header" >
          <div className="form-group">
            <label htmlFor="InputId">Package ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={pack.id}
              placeholder="Enter Package ID to delete"
              onChange={handleInputChange}
            ></input>
          </div>

          <button className="btn btn-danger" onClick={(pack) => deletePackage(pack)}
value={pack.id}>
            Delete Package
          </button>
        </form>
      </header>
    </div>
  );
}

export default DeletePackage;
