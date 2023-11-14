const fs = require("fs");
const doctorModel = require("../Models/Doctor");
const { default: mongoose } = require("mongoose");
const patientModel = require("../Models/Patient");
const user = require("../Models/user.js");
const appointment = require("../Models/Appointments.js");
const healthRecord = require("../Models/HealthRecord.js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const upload = multer({ dest: "uploads/" });
// const Patient = JSON.parse(fs.readFileSync('./data/patient.json'));
// const Doctors = JSON.parse(fs.readFileSync('./data/doctor.json'));

const addDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    res.send(
      await userModel.create({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        hourlyRate: req.body.hourlyRate,
        affiliation: req.body.affiliation,
        educationBackground: req.body.educationBackground,
        speciality: req.body.speciality,
      })
    );
  } catch (e) {
    res.status(400).send(e);
  }
};

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
  try {
    const token = req.cookies.jwt;
    let id;

    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        console.log("alo");
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
        console.log(id);

        // Perform the update operation here
        performUpdate(req, res, id);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const performUpdate = async (req, res, id) => {
  const { email, hourlyRate, affiliation } = req.body;

  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      id,
      { email: email, hourlyRate: hourlyRate, affiliation: affiliation },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: {
        updatedDoctor,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//view information and health records of patient registered with me:
const viewHealthRecords = async (req, res) => {
  const patientId = req.query.patientId; // Patient's ID

  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
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
    // res.status(400).json({
    //   message: err.message,
    // });
    console.log(err);
  }
};

//View a list of all my patients:
const getAllMyPatients = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let id;

    try {
      const decodedToken = await jwt.verify(token, "supersecret");
      id = decodedToken.name;
    } catch (err) {
      res.status(401).json({ message: "You are not logged in." });
      return;
    }

    const doctor = await doctorModel.findById(id);

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
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

//Search for a patient by name:

const searchPatientByName = async (req, res) => {
  const { name } = req.query;
  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
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
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

//filter appointments by date/status:

const filterAppointmentsByDateAndStatus = async (req, res) => {
  const { date, status } = req.query;
  const currentDate = new Date();

  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
    let filter = { doctor: doctorId, date: { $gte: currentDate } };

    // Check if date is provided
    if (date) {
      filter.date = { $gte: date };
    }

    // Check if status is provided
    if (status) {
      filter.status = status;
    }

    const appointments = await appointment.find(filter);
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
  const inputDate = req.query.date;
  // console.log("doctorID " + doctorId + "    date " + inputDate);
  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
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
  const patientUser = req.query.patientUser;
  // console.log("Patient Username:" + patientUser);
  const patientId = await user.findOne({ username: patientUser });
  // console.log("Patient ID:" + patientId);
  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
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

// const getPassword = async (req, res) => {
//   try{
//     const token = req.cookies.jwt;
//     var id;
//     jwt.verify(token, 'supersecret', (err ,decodedToken) => {
//       if (err) {
//         res.status(401).json({message: "You are not logged in."})
//       }
//       else {
//         id = decodedToken.name;
//       }
//     });
//   const userId = id;
//   var user = await doctorModel.findById(userId);
//   res.status(200).send(user.password)
//   }catch (err) {
//       res.status(400).json({
//         message:err.message,
//       });
//   }
// }

// const changePassword = async (req, res) => {
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   var newPassword = hashedPassword;

//   try {
//     const token = req.cookies.jwt;
//     var id;
//     jwt.verify(token, 'supersecret', (err ,decodedToken) => {
//       if (err) {
//         res.status(401).json({message: "You are not logged in."})
//       }
//       else {
//         id = decodedToken.name;
//       }
//     });
//     const userID = id;
//     await doctorModel.findByIdAndUpdate(userID, { password: newPassword })
//     res.status(200).send('Password updated successfully')
//   }
//   catch (err) { console.error(err) }
// }

const getAmountInWallet = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "You are not logged in." });
    }

    const decodedToken = jwt.verify(token, "supersecret");
    const userId = decodedToken.name;

    const doctor = await doctorModel.findById(userId);

    return res.status(200).send(doctor.amountInWallet.toString() + " EGP");
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Invalid token or you are not logged in." });
  }
};

const getTimeSlots = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const doctorId = id;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingTimeSlots = doctor.availableTimeSlots || [];
    res.status(200).json(existingTimeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addTimeSlots = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        try {
          const doctorId = decodedToken.name;

          const { availableTimeSlots } = req.body;

          const updatedDoctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            {
              $push: { availableTimeSlots: { $each: availableTimeSlots } },
            },
            { new: true }
          );

          if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
          }

          res.status(200).json({
            status: "success",
            message: "Available time slots added successfully",
          });
        } catch (error) {
          console.error("Error adding time slots:", error.message);
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const uploadPatientHealthRec = async (req, res) => {
  upload.array("medicalHistory", 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const username = req.body.username;
    const newMedicalHistory = req.files.map((file) => {
      return {
        name: file.originalname,
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      };
    });

    patientModel
      .findOneAndUpdate(
        { username: username },
        { $push: { medicalHistory: { $each: newMedicalHistory } } },
        { new: true }
      )
      .then((doc) => {
        return res
          .status(200)
          .send(`Health record file uploaded for ${username}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

const followupAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, followUp } = req.body;

    // Check if the appointment date is after the current date
    const currentDate = new Date();
    if (new Date(date) <= currentDate) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid appointment date. Date must be after the current date.",
      });
    }

    // Check if the doctor and patient exist
    const doctorDetails = await doctorModel.findById(doctor);
    const patientDetails = await patientModel.findById(patient);

    if (!doctorDetails || !patientDetails) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor or patient not found.",
      });
    }

    // Check if the selected time slot is available for the doctor
    if (!doctorDetails.availableTimeSlots.includes(date)) {
      return res.status(400).json({
        status: "fail",
        message: "Selected time slot is not available for the doctor.",
      });
    }

    // Remove the scheduled time slot from the doctor's availableTimeSlots
    doctorDetails.availableTimeSlots = doctorDetails.availableTimeSlots.filter(
      (slot) => slot !== date
    );

    const newAppointment = await appointment.create({
      doctor: doctorDetails._id,
      patient: patientDetails._id,
      date: date,
      status: "pending",
      duration: 30,
    });

    res.status(201).json({
      status: "success",
      data: {
        appointment: newAppointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

module.exports = {
  addDoctor,
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
  getAmountInWallet,
  getTimeSlots,
  addTimeSlots,
  uploadPatientHealthRec,
  followupAppointment,
};
