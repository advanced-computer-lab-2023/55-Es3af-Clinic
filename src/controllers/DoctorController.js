const fs = require('fs');
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patientModel = require("../Models/Patient");
const user = require("../Models/user.js");
const appointment = require('../Models/Appointments.js');
const healthRecord = require("../Models/HealthRecord.js");

// const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));
// const Doctors = JSON.parse(fs.readFileSync('./data/doctor.json'));



const getAllPatients = async (req, res) => {
  try{
    const patients = await patientModel.find({});
    console.log("success")
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
  const getAllDoctors = async (req, res) => {
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

const createAppointment =async (req, res) => {
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

//create Health Records:
const createHealthRecords =async (req, res) => {
  try{
    const newHealthRecord = await healthRecord.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newHealthRecord
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
const updateDoctor = async (req, res) => {
  const doctorId = req.query.doctorId; 
  const { email, hourlyRate, affiliation } = req.body;

  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, { email: email, hourlyRate: hourlyRate, affiliation: affiliation }, { new: true });
    console.log("dakhalna 2")
    res.status(200).json({
      status: 'success',
      data: {
        updatedDoctor
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

//view information and health records of patient registered with me:
const viewHealthRecords = async (req, res) => {
  const doctorId = req.query.doctorId;  // Doctor's ID
  const patientId = req.query.patientId;  // Patient's ID

  try {
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor not found'
      });
    }

    const healthRecords = await healthRecord.find({patient: patientId});
    // const patient = await patientModel.findById(patientId);

      // .populate('healthRecords');  

      // console.log(patient)

    if (!healthRecords) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found'
      });
    }

    const Appointment = await appointment.findOne({ doctor: doctorId, patient: patientId });
    // console.log(Appointment)
    if (!Appointment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient is not registered with this doctor'
      });
    }

    // const healthRecords = patient.healthRecords; 
    console.log(healthRecords)

    res.status(200).json({
      status: 'success',
      data: {
        healthRecords
        // patient
        
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};



//View a list of all my patients:
const getAllMyPatients = async (req, res) => {
  const doctorUser = req.query.doctor;
  try {
    const doctor = await user.findOne({ username: doctorUser });

    if (!doctor) {
      res.status(404).json({
        message: 'Doctor not found'
      });
      return;
    }

    console.log(doctor._id);

    const appointments = await appointment.find({ doctor: doctor._id });
    const patientIds = appointments.map(appointment => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });

    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//Search for a patient by name:

const searchPatientByName = async (req, res) => {
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

const filterAppointmentsByDateAndStatus = async (req, res) => {
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
const filterPatientsByUpcomingPendingAppointments = async (req, res) => {
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

// select a patient from the list of patients:
const selectPatient = async (req, res) => {
  const { doctorId, patientId } = req.query;  
  console.log("yes")
  try {
    const patient = await patientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found'
      });
    }

        patient.assignedDoctor = doctorId;
    await patient.save();

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Patient assigned to doctor successfully'
      }
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};



module.exports = {getAllPatients, getAllDoctors, createHealthRecords, createAppointment, updateDoctor, viewHealthRecords, searchPatientByName,  getAllMyPatients, filterAppointmentsByDateAndStatus, filterPatientsByUpcomingPendingAppointments, selectPatient}




