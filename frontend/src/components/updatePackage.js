import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import packageService from "../services/packageService";
import Home from "./gohome";

function UpdatePackage() {
  const initialPackageState = {
    type: "",
    price: 0,
    sessionDiscount: 0,
    medicationDiscount: 0, // Added field
    familyMemberDiscount: 0, // Added field
  };

  const [pack, setPack] = useState(initialPackageState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPack({ ...pack, [name]: value });
  };

  const update = async (e) => {
    e.preventDefault();

    try {
      // Send only the relevant data for package update
      const { type, price, sessionDiscount, medicationDiscount, familyMemberDiscount } = pack;

      // Update the request payload to match the backend expectations
      const response = await packageService.updatePackage({
        type,
        price,
        sessionDiscount,
        medicationDiscount,
        familyMemberDiscount,
      });

      console.log(response.data);

      // Optionally, you can reset the form or perform any other actions
      setPack(initialPackageState);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <form className="App-header" onSubmit={update}>
          <div className="form-group">
            <label htmlFor="type">Package type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={pack.type}
              placeholder="Enter Package type"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Package price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={pack.price}
              placeholder="Price"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sessionDiscount">Session Discount</label>
            <input
              type="number"
              className="form-control"
              id="sessionDiscount"
              name="sessionDiscount"
              value={pack.sessionDiscount}
              placeholder="Session Discount"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicationDiscount">Medication Discount</label>
            <input
              type="number"
              className="form-control"
              id="medicationDiscount"
              name="medicationDiscount"
              value={pack.medicationDiscount}
              placeholder="Medication Discount"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="familyMemberDiscount">Family Member Discount</label>
            <input
              type="number"
              className="form-control"
              id="familyMemberDiscount"
              name="familyMemberDiscount"
              value={pack.familyMemberDiscount}
              placeholder="Family Member Discount"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Package
          </button>
        </form>
      </header>
    </div>
  );
}

export default UpdatePackage;
