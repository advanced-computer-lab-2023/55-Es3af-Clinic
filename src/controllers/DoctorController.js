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
  const doctorId = req.query.Id;
  try{
    const appointments = await appointment.find({ doctor: doctorId });
    const patientIds = appointments.map(appointment => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });
   
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

exports.searchPatientByName = async (req, res) => {
  const { name } = req.query
  const doctorId = req.body.Id;
    

  try {
    // const patients = await patientModel.find({name});  
    const appointments = await appointment.find({ doctor: doctorId });
    const patientIds = appointments.map(appointment => appointment.patient);
    const patients = await patientModel.find({$and: [{ _id: { $in: patientIds }}, {name: name}]});

    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};


//filter appointments by date/status:

exports.filterAppointmentsByDateAndStatus = async (req, res) => {
  const { date, status } = req.query;

  try {
    let filter = {};

    // Check if date is provided
    if (date) {
      filter.date = date;
    }

    // Check if status is provided
    if (status) {
      filter.status = status;
    }

    const appointments = await appointment.find(filter);

    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

//filter patients based on upcoming appointments:
exports.filterPatientsByUpcomingPendingAppointments = async (req, res) => {
  const doctorId = req.query.Id;  

  try {
    const upcomingPendingAppointments = await appointment.find({
      doctor: doctorId,
      date: { $gte: new Date() },  // Filter for future appointments
      status: "pending"  // Filter for pending status
    });

    const patientIds = upcomingPendingAppointments.map(appointment => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });

    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};


//view information and health records of patient registered with me:

//select a patient from the list of patients:
//ghaleban front end
