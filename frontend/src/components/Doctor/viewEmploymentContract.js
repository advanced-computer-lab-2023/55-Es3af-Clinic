import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import DoctorService from "../../services/doctorService";
import doctorService from "../../services/doctorService";

const MyContractList = (props) => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

  
    useEffect( () => {
      console.log("useEffect called")
      retrieveContracts();
    }, []);
  
    const retrieveContracts =  () => {
      console.log("test")
      DoctorService.getContractsByDoctorId()
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data.data.contracts)) {
            setContracts(response.data.data.contracts);
          } else {
            console.log("Data is not an array:", response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        }).finally(() => {
          setLoading(false);
        });
    };
  
    const update = (contract) => {
      console.log("Updating contract:", contract);
    };

    
  // Function to accept a contract
  const acceptContract = async (contractId,contract) => {
    try {
      
        contract.status = "Active"
      // Assuming you have an API endpoint for accepting a specific contract
      const response = await doctorService.updateContract(contractId,contract)
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  
    return (
      <div>
        <div className="App-header" id="contentContainer">
        {loading ? (
          <h2>Loading...</h2>
        ) : contracts.length > 0 ? (
            contracts.map((contract) => {
              return (
                <div 
                  className="card"
                  key={contract._id}
                  style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
                >
                  <div className="card-body">
                      <h3 className="card-title" style={{ color: "white" }}>
                        Markup: {contract.markup}
                      </h3>
                      <div>
                        <input
                          type="checkbox"
                          checked={contract.status === "Active"}
                          readOnly
                        />
                        <label style={{ color: "white" }}> Active</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={contract.status === "Pending"}
                          readOnly
                        />
                        <label style={{ color: "white" }}> Pending</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={contract.status === "Terminated"}
                          readOnly
                        />
                        <label style={{ color: "white" }}> Terminated</label>
                      </div>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Start Date: {contract.startDate}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Termination Date: {contract.terminationDate}
                      </h3>
                      <h3 className="card-title" style={{ color: "white" }}>
                        Fees: {contract.fees}
                      </h3>
                      <button
                      style={{ backgroundColor: "#2a5923" }}
                      id="updateButton"
                      className="btn btn-primary"
                      onClick={async (e) => {
                        e.preventDefault();
                        await acceptContract(contract._id, contract);
                      }}
                      disabled={contract.status !== "Pending"}
                    >
                      Accept Contract
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h2>No contracts</h2>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default MyContractList;
  