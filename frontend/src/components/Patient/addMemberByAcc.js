import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MemberService from "../../services/familyMemberService";

function AddMemberAcc() {
    const initialUserState = {
        email: "",
        mobile:"",
        relationToPatient: ""
    };

    const [member,setMember] = useState(initialUserState)
    const [inputType, setInputType] = useState("email");

    const handleInputChange = (event) => {

      const { name,  value } = event.target;
      setMember({...member, [name]:value});  
    };
    async function addMember(e) {
        e.preventDefault();
        // no need to console log response data, only for testing
        MemberService.addMember(member,"6550f3b6d9aee1af3acedf0a")
          .then((response) => {
            alert(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }
    
    return (
        <div className="App">
          <header className="App-header">
            <form className="App-header" onSubmit={addMember}>
              <div className="form-group">
              <label>Enter a:</label>
            <div>
              <input
                type="radio"
                id="emailRadio"
                name="inputType"
                value="email"
                checked={inputType === "email"}
                onChange={() => setInputType("email")}
              />
              <label htmlFor="emailRadio">Email</label>
            </div>
            <div>
              <input
                type="radio"
                id="phoneRadio"
                name="inputType"
                value="mobile"
                checked={inputType === "mobile"}
                onChange={() => setInputType("mobile")}
              />
              <label htmlFor="phoneRadio">Phone Number</label>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor={inputType}>
              {inputType === "email" ? "Email" : "Phone Number"}
            </label>
            <input
              type={inputType === "email" ? "email" : "text"}
              className="form-control"
              id={inputType}
              name={inputType}
              value={member[inputType]}
              placeholder={
                inputType === "email"
                  ? "Enter Family Member Email"
                  : "Enter Family Member Phone Number"
              }
              onChange={handleInputChange}
            />
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

export default AddMemberAcc