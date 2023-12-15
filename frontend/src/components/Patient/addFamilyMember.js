import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MemberService from "../../services/familyMemberService";
import Home from "../gohome";

function AddMember() {
    const initialUserState = {
        name: "",
        nationalID: "",
        age: 0,
        gender: "",
        //patient: "patientSara",
        relationToPatient: ""
    };

    const [member,setMember] = useState(initialUserState)

    const handleInputChange = (event) => {

      const { name,  value } = event.target;
      setMember({...member, [name]:value});  
    };
    async function addMember2(e) {
        e.preventDefault();
        // no need to console log response data, only for testing
        MemberService.addMember2(member)
          .then((response) => {
            console.log(response.data);
            alert(response.data)
          })
          .catch((e) => {
            console.log(e);
          });
    }
    
    return (
        <div className="App">
          <Home />
          <header className="App-header">
          <div className="top-right-button">
            <a href= "/patient/addFamilyMemberByAcc">
          <button className="btn btn-primary" >Add by Email/Phone number</button>
          </a>
        </div>
            <form className="App-header" onSubmit={addMember2}>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="name"
                  value={member.name}
                  placeholder="Enter Family Member Name"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="Age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="Age"
                  name="age"
                  value={member.age}
                  placeholder="Enter Family Member age"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="Gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="RelationToPatient"
                  name="gender"
                  value={member.gender}
                  placeholder="Enter Gender"
                  onChange={handleInputChange}
                ></input>
               </div>
              <div className="form-group">
                <label htmlFor="NationalID">NationalID</label>
                <input
                  type="number"
                  className="form-control"
                  id="NationalID"
                  name="nationalID"
                  value={member.nationalID}
                  placeholder="Enter Family member national ID"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="RelationToPatient">Relation to Patient</label>
                <input
                  type="text"
                  className="form-control"
                  id="RelationToPatient"
                  name="relationToPatient"
                  value={member.relationToPatient}
                  placeholder="Enter Relation to you (Wife/Husband or Child only)"
                  onChange={handleInputChange}
                ></input>
               </div>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Add Family Member
              </button>
            </form>
          </header>
        </div>
    );
}

export default AddMember