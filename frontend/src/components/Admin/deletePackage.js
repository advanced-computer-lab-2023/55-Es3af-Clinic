import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PackageService from "../../services/packageService";

function DeletePackage() {
  const initialUserState = {
    id: "", // change from type to id
  };

  const [pack, setPack] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPack({ ...pack, [name]: value });
  };

  const deletePackage = () => {
    PackageService.deletePackage(pack.id)
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header">
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
            />
          </div>

          <button className="btn btn-danger" onClick={deletePackage}>
            Delete Package
          </button>
        </form>
      </header>
    </div>
  );
}

export default DeletePackage;
