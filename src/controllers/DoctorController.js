const fs = require('fs');
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patient = require("../Models/Patient");

const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));


exports.getAllPatients = async (req, res) => {
    try {
    //   res.status(200).send(await patient.findById(req.params.id));
      res.status(200).json({
        status: "success",
        data: {
            Patients: Patient 
        }
      })
      console.log("ok");
    } catch (e) {
      res.status(400).send(e);
    }
  };
  exports.createPatient = (req, res) => {
    const newId = Patient[Patient.length - 1].id + 1;
    const newPatient = Object.assign({id: newId}, req.body);
    Patient.push(newPatient);
    fs.writeFile(`${__dirname}/data/patient.json`, JSON.stringify(Patient), err => {
        res.status(201).json({
            status: 'success',
            data: {
                Patient: newPatient
            } 
        })
    });
};

// exports.getAllPatients = (req, res) => {
//     // console.log(req.requestTime);
//     res.status(200).json({
//         status: "success",
//         data: {
//             tours: tours
//         }
//     });
// };
  


// const updateEmail = async(req, res) => {

// }