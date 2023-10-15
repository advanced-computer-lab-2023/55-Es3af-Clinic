import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PatientService from "../services/patientService";
import { useParams } from "react-router-dom";


const DoctorInfo = (props) => {
    console.log('7aga')
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
        // const { name, affiliation, educationBackground, speciality, price } =
        //   response.data;

        // const docInfo = {
        //   name,
        //   affiliation,
        //   educationBackground,
        //   speciality,
        //   price,
        // };
        console.log(response);
        setDoctor(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

    // const doctor = {
    //     "hourlyRate": 8,
    //     "affiliation": "no where",
    //     "educationBackground": "uni",
    //     "speciality": "heart",
    //     "username": "doc62",
    //     "name": "doc2",
    //     "email": "doc@gmail.com",
    //     "password": "doc1",
    //     "dateOfBirth": {
    //       "$date": "2002-11-11T00:00:00.000Z"
    //     },
    //     "type": "doctor",
    //     "__t": "doctor",
    //     "createdAt": {
    //       "$date": "2023-10-10T20:10:20.180Z"
    //     },
    //     "updatedAt": {
    //       "$date": "2023-10-11T10:38:12.040Z"
    //     },
    //     "__v": 0
    //   }

  return (
    <div>
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
