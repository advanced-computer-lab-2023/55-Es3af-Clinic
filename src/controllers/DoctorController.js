const fs = require('fs');
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patientModel = require("../Models/Patient");
const user = require("../Models/user.js");
const appointment = require('../Models/Appointments.js');

// const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));
// const Doctors = JSON.parse(fs.readFileSync('./data/doctor.json'));



exports.getAllPatients = async (req, res) => {
  try{
    const patients = await patientModel.find({});
    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    })
  } catch(err) {
    res.status(400).json({
      status: fail,
      message: err
    })
 }
}
  exports.getAllDoctors = async (req, res) => {
    try{
      const doctors = await doctorModel.find({});
      res.status(200).json({
        status: 'success',
        data: {
          doctors
        }
      })
    } catch(err) {
      res.status(400).json({
        status: fail,
        message: err
      })
   }
  };

//Create Appointment:

exports.createAppointment =async (req, res) => {
  try{
    const newAppointment = await appointment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        appointment: newAppointment
      }
    });
  }catch(err) {
    res.status(400).json({
      status: 'fail', 
      message: "Inavalid data sent"
    })
  }
}


//edit/ update my email, hourly rate or affiliation (hospital):
exports.updateDoctor = async(req, res) => {
  const doctorId = req.params.id;
  const {email, hourlyRate, affiliation} = req.body;
    try{
        //const newBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body);
       
        updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, {email, hourlyRate, affiliation}, {new: true});
        res.status(200).json({
          status: 'success',
          data: {
            updatedDoctor
          }
        })
      }catch(err){
        res.status(400).json({
          message: err.message
        })
      } 
}
//view information and health records of patient registered with me

//View a list of all my patients:
exports.getAllMyPatients = async (req, res) => {
  try{
    const appointments = await appointment.find({doctor: req.query.Id});
    const patients = await patientModel.findById(appointments.patient);
    // const appointments = await appointment.find({doctor: req.query.Id}).select({patient});

    // console.log(appointments);
    // const patients = appointments.select(patient);
    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    })
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
 }
}
//Search for a patient by name:

//filter appointments by date/status:

exports.filterAppointmentsByDate = async(req, res) => {
  // const {date} = req.query; 
  try{
    //  const Appointment = await appointment.findOne(req.query);
    //Tour.findOne({_id: req.params.id})
    const Appointment = await appointment.find({date: req.query.Date});
    res.status(200).json({
      status: 'success',
      data: {
       appointment: Appointment
     }
    })
  }catch(err){
    res.status(400).json({
      message: err.err
    })
  }
}
exports.filterAppointmentsByStatus = async(req, res) => {
  const {status} = req.query; 
  try{
     const Appointment = await appointment.find({status: req.query.status});
    //Tour.findOne({_id: req.params.id})
    // const Appointment = await appointment.findOne({status});
    res.status(200).json({
      status: 'success',
      data: {
       appointment: Appointment
     }
    })
  }catch(err){
    res.status(400).json({
      message: err.message
    })
  }
}


//view information and health records of patient registered with me:

//select a patient from the list of patients:


//   exports.updateEmail = async(req, res) => {
//     const Email = req.body.email;
//     const id = req.body.id * 1;
//     // Doctors.findOneAndUpdate({Email : Email}, {id: id}).catch(err => console.log(err));
//     const emailToBeUpdated = Doctors.find(el => el.doctorId === id);
//     if(!emailToBeUpdated){
//       return res.status(404).json({
//           status: 'fail',
//           message: 'Invalid ID'
//       });
//   }
//   res.status(200).json({
//       status: "success", 
//       data: {
//           Email
//       }
//   });
// };

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
  