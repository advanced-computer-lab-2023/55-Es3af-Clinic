import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PackageService from "../../services/packageService";
import Home from "../gohome";

function CreatePackage() {
  const initialUserState = {
    type: "",
    price: "",
    sessionDiscount: "",
    medicationDiscount: "",
    familyMemberDiscount: "",
  };

  const [pack, setPack] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPack({ ...pack, [name]: value });
  };

  async function createPackage(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    PackageService.createPackage(pack)
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
        <form className="App-header" onSubmit={createPackage}>
          <div className="form-group">
            <label htmlFor="InputType">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={pack.type}
              placeholder="Enter Type"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPrice">Price</label>
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
            <label htmlFor="InputSessionDiscount">Session Discount</label>
            <input
              type="number"
              className="form-control"
              id="sessionDiscount"
              name="sessionDiscount"
              value={pack.sessionDiscount}
              placeholder="Session Discount"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputMedicationDiscount">Medication Discount</label>
            <input
              type="number"
              className="form-control"
              id="medicationDiscount"
              name="medicationDiscount"
              value={pack.medicationDiscount}
              placeholder="Medication Discount"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputFamilyMemberDiscount">Family Member Discount</label>
            <input
              type="number"
              className="form-control"
              id="familyMemberDiscount"
              name="familyMemberDiscount"
              value={pack.familyMemberDiscount}
              placeholder="Family Member Discount"
              onChange={handleInputChange}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Package
          </button>
        </form>
      </header>
    </div>
  );
}

export default CreatePackage;