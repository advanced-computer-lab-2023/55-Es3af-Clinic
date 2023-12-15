import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../../services/patientService";
import { useParams } from "react-router-dom";
import Home from "../gohome";


const DoctorInfo = (props) => {
    //console.log('7aga')
  const { id } = useParams()
  console.log(id)
  const temp = {
    name: "",
  }
  const [doctor, setDoctor] = useState(temp);
  useEffect(() => {
    viewInfo();
  }, []);

  const viewInfo = () => {
    console.log('view info called')
    PatientService.viewDocInfo(id)
      .then((response) => {
        console.log(response);
        setDoctor(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Home />
      <div className="App-header">
          <div
            className="card"
            key={""}
            style={{ width: 450, backgroundColor: "#282c34", margin: 10 }}
          >
            <div className="card-body">
              <h3 className="card-title" style={{ color: "white" }}>
                Name: {doctor.name}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Affiliation: {doctor.affiliation}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Education Background: {doctor.educationalBackground}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Speciality: {doctor.speciality}
              </h3>
              <h3 className="card-title" style={{ color: "white" }}>
                Price: {doctor.price}
              </h3>
            </div>
          </div>

      </div>
    </div>
  );
};

export default DoctorInfo;
