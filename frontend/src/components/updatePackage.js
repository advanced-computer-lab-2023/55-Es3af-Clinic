import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import packageService from "../services/packageService";
import adminService from "../services/adminService";


function UpdatePackage() {
  const initialUserState = {
    type: "",
    price: 0,
    sessionDiscount: 0,
    medicationDiscount: 0, 
    familyMemberDiscount: 0

  };

  const [pack, setPack] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    {
      setPack({ ...pack, [name]: value});
    }
  }
  async function update(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    packageService.UpdatePackage(pack)
      .then((response) => {
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-header" onSubmit={update}>
          <div className="form-group">
            <label htmlFor="InputUsername">package name</label>
            <input
              type="string"
              className="form-control"
              id="type"
              name="type"
              value={pack.type}
              placeholder="Enter username"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">package price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={pack.price}
              placeholder="Price"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1"> sessionDiscount</label>
            <input
              type="string"
              className="form-control"
              id="sessionDiscount"
              name="sessionDiscount"
              value={pack.sessionDiscount}
              placeholder="ingredients"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            update package
          </button>
        </form>
      </header>
    </div>
  );
}

export default UpdatePackage;