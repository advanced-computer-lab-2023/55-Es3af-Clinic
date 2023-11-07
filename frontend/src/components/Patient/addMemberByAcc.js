import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MemberService from "../../services/familyMemberService";

function AddMemberAcc() {
    const initialUserState = {
        username: "",
        relationToPatient: ""
    };

    const [member,setMember] = useState(initialUserState)

    const handleInputChange = (event) => {

      const { name,  value } = event.target;
      setMember({...member, [name]:value});  
    };
    async function addMember(e) {
        e.preventDefault();
        // no need to console log response data, only for testing
        MemberService.addMember(member,"farouhaTe3bet")
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
            <form className="App-header" onSubmit={addMember}>
              <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="UserName"
                  name="username"
                  value={member.username}
                  placeholder="Enter Family Member Username"
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

export default AddMemberAcc