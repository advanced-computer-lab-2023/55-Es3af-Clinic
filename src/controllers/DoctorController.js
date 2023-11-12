const fs = require("fs");
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patientModel = require("../Models/Patient");
const user = require("../Models/user.js");
const appointment = require("../Models/Appointments.js");
const healthRecord = require("../Models/HealthRecord.js");
const bcrypt = require("bcrypt");
// const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));
// const Doctors = JSON.parse(fs.readFileSync('./data/doctor.json'));

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find({});
    console.log("success");
    res.status(200).json({
      status: "success",
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err,
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).json({
      status: "success",
      data: {
        doctors,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err,
    });
  }
};

//Create Appointment:

const createAppointment = async (req, res) => {
  try {
    const newAppointment = await appointment.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        appointment: newAppointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Inavalid data sent",
    });
  }
};

//create Health Records:
const createHealthRecords = async (req, res) => {
  try {
    const newHealthRecord = await healthRecord.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newHealthRecord,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Inavalid data sent",
    });
  }
};

//edit/ update my email, hourly rate or affiliation (hospital):
const updateDoctor = async (req, res) => {
  const doctorId = req.query.doctorId;
  const { email, hourlyRate, affiliation } = req.body;

  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { email: email, hourlyRate: hourlyRate, affiliation: affiliation },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedDoctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//view information and health records of patient registered with me:
const viewHealthRecords = async (req, res) => {
  const doctorId = req.query.doctorId; // Doctor's ID
  const patientId = req.query.patientId; // Patient's ID

  try {
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const healthRecords = await healthRecord.find({ patient: patientId });
    // const patient = await patientModel.findById(patientId);

    // .populate('healthRecords');

    // console.log(patient)

    if (!healthRecords) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    const Appointment = await appointment.findOne({
      doctor: doctorId,
      patient: patientId,
    });
    // console.log(Appointment)
    if (!Appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Patient is not registered with this doctor",
      });
    }

    // const healthRecords = patient.healthRecords;
    console.log(healthRecords);

    res.status(200).json({
      status: "success",
      data: {
        healthRecords,
        // patient
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
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
        message: "Doctor not found",
      });
      return;
    }

    console.log(doctor._id);

    const appointments = await appointment.find({ doctor: doctor._id });
    const patientIds = appointments.map((appointment) => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });

    res.status(200).json({
      status: "success",
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Search for a patient by name:

const searchPatientByName = async (req, res) => {
  const { name } = req.query;
  const doctorId = req.query.doctorId;

  try {
    const appointments = await appointment.find({ doctor: doctorId });
    const patientIds = appointments.map((appointment) => appointment.patient);
    const patients = await patientModel.find({
      $and: [{ _id: { $in: patientIds } }, { name: name }],
    });

    res.status(200).json({
      status: "success",
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//filter appointments by date/status:

const filterAppointmentsByDateAndStatus = async (req, res) => {
  const { date, status } = req.query;
  const doctorid = req.params.id;
  const currentDate = new Date()

  try {
    let filter = { doctor: doctorid, date: { $gte: currentDate } };

    // Check if date is provided
    if (date) {
      filter.date = { $gte: date };
    }

    // Check if status is provided
    if (status) {
      filter.status = status;
    }

    const appointments = await appointment
      .find(filter)
    //.populate("patient", "name -_id -__t");
    res.status(200).send(appointments);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//filter patients based on upcoming appointments:
const filterPatientsByUpcomingPendingAppointments = async (req, res) => {
  const doctorId = req.query.Id;
  const inputDate = req.query.date;
  console.log("doctorID " + doctorId + "    date " + inputDate);
  try {
    const upcomingPendingAppointments = await appointment.find({
      doctor: doctorId,
      date: { $gte: new Date(inputDate) }, // Filter for future appointments
      status: "pending", // Filter for pending status
    });

    const patientIds = upcomingPendingAppointments.map(
      (appointment) => appointment.patient
    );
    const patients = await patientModel.find({ _id: { $in: patientIds } });

    res.status(200).json({
      status: "success",
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// select a patient from the list of patients:
const selectPatient = async (req, res) => {
  const doctorId = req.query.doctorId;
  const patientUser = req.query.patientUser;
  console.log("Patient Username:" + patientUser);
  const patientId = await user.findOne({ username: patientUser });
  console.log("Patient ID:" + patientId);
  try {
    const patient = await patientModel.findById(patientId);

    if (!patient) {
      console.log("fail");
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    patient.assignedDoctor = doctorId;
    await patient.save();
    console.log("yes2");
    res.status(200).json({
      status: "success",
      data: {
        message: "Patient assigned to doctor successfully",
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getPassword = async (req, res) => {
  const userID = req.params.id
  var user = await doctorModel.findById(userID);
  res.status(200).send(user.password)
}
const changePassword = async (req, res) => {
  const userID = req.params.id
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  var newPassword = hashedPassword;
  
  try {
    await doctorModel.findByIdAndUpdate(userID, { password: newPassword })
    res.status(200).send('Password updated successfully')
  }
  catch (err) { console.error(err) }

}
const getAmountInWallet = async (req, res) => {
  const username = req.params.username
  const doctor = await doctorModel.findOne({ username: username });
  res.status(200).send((doctor.amountInWallet).toString() + " EGP");
}
const getTimeSlots = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existingTimeSlots = doctor.availableTimeSlots || [];
    res.status(200).json(existingTimeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const addTimeSlots = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { availableTimeSlots } = req.body;

    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.availableTimeSlots = doctor.availableTimeSlots || [];
    doctor.availableTimeSlots.push(...availableTimeSlots);
    await doctor.save();

    res.status(200).json({ status: 'success', message: 'Available time slots added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};



module.exports = {
  getAllPatients,
  getAllDoctors,
  createHealthRecords,
  createAppointment,
  updateDoctor,
  viewHealthRecords,
  searchPatientByName,
  getAllMyPatients,
  filterAppointmentsByDateAndStatus,
  filterPatientsByUpcomingPendingAppointments,
  selectPatient,
  changePassword,
  getPassword,
  getAmountInWallet,
  getTimeSlots,
  addTimeSlots
};
