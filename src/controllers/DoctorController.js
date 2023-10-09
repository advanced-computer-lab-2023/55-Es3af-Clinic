const fs = require('fs');
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patient = require("../Models/Patient");
const user = require("../Models/User.js");

const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));
const Doctors = JSON.parse(fs.readFileSync('./data/doctor.json'));


exports.getAllPatients = async (req, res) => {
    try {
    //   res.status(200).send(await patient.findById(req.params.id));
    //   console.log("ok");
      res.status(200).json({
        status: "success",
        data: {
            Patients: Patient 
        }
      })
    }
     catch (e) {
      res.status(400).send(e);
    }
  };
  exports.getAllDoctors = async (req, res) => {
      res.status(200).json({
        status: "success",
        data: {
            Doctors: Doctors 
        }
      })
  };
  exports.updateEmail = async(req, res) => {
    const Email = req.body.email;
    const id = req.body.id * 1;
    // Doctors.findOneAndUpdate({Email : Email}, {id: id}).catch(err => console.log(err));
    const emailToBeUpdated = Doctors.find(el => el.doctorId === id);
    if(!emailToBeUpdated){
      return res.status(404).json({
          status: 'fail',
          message: 'Invalid ID'
      });
  }
  res.status(200).json({
      status: "success", 
      data: {
          Email
      }
  });
};

    // res.status(200).send("Updated the user with the email " + Email + " in database");   

//    try{
//     res.status(200).send("Updated the user with the email " + Email + " in database").json({
//         status: 'success',
//         data: {
//             Email: Email
//         }
//     });
// }catch(e) {
//     res.status(400).send(e);
// }
//   }
//   var Name = req.body.name;
//    var Email = req.body.email;
//     var Age = req.body.age;
//    userModel.findOneAndUpdate({Email : Email}, {Name : Name, Age : Age}).catch(err => console.log(err));
//    res.status(200).send("Updated the user with the email " + Email + " in database");

//   exports.createPatient = (req, res) => {
//     const newId = Patient[Patient.length - 1].id + 1;
//     const newPatient = Object.assign({id: newId}, req.body);
//     Patient.push(newPatient);
//     fs.writeFile(`${__dirname}/data/patient.json`, JSON.stringify(Patient), err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 Patient: newPatient
//             } 
//         })
//     });
//};

// exports.getAllPatients = (req, res) => {
//     // console.log(req.requestTime);
//     res.status(200).json({
//         status: "success",
//         data: {
//             tours: tours
//         }
//     });
// };
  


