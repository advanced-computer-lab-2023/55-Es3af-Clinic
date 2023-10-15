import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import packageService from "../services/packageService";
import adminService from "../services/adminService";


function UpdatePackage() {
  const initialUserState = {
    type: "",
    price: 0,
    sessionDiscount: 60,
    medicationDiscount: 40, 
    familyMemberDiscount: 20

  };

  const [, setPackage] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name=== 'ActiveIngredients'){
      const activeIngredientsList = value.split(',');
      setMedicine({ ...medicine, [name]: activeIngredientsList});
    }else{
      setMedicine({...medicine, [name]:value});
  }
  }
  async function update(e) {
    e.preventDefault();
    // no need to console log response data, only for testing
    MedsService.updateMedicine(medicine)
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
            <label htmlFor="InputUsername">medicine name</label>
            <input
              type="string"
              className="form-control"
              id="Name"
              name="Name"
              value={medicine.Name}
              placeholder="Enter username"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1">medicine price</label>
            <input
              type="number"
              className="form-control"
              id="Price"
              name="Price"
              value={medicine.Price}
              placeholder="Price"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1">active ingredients</label>
            <input
              type="string"
              className="form-control"
              id="ActiveIngredients"
              name="ActiveIngredients"
              value={medicine.ActiveIngredients}
              placeholder="ingredients"
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            update medicine
          </button>
        </form>
      </header>
    </div>
  );
}

export default EditMedicine;