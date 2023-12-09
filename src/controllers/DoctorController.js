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
const mediceneModel = require('../Models/Medicine.js');
const prescription = require("../Models/Prescriptions.js");
const followUps = require("../Models/FollowUpRequests.js");

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
    let id;

    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
        proceedWithViewHealthRecords(req, res, id, patientId);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const proceedWithViewHealthRecords = async (req, res, doctorId, patientId) => {
  try {
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    const medicalHistory = patient.medicalHistory;

    const Appointment = await appointment.findOne({
      doctor: doctorId,
      patient: patientId,
    });

    if (!Appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Patient is not registered with this doctor",
      });
    }

    // Extract file data from medical history and send them in the response
    const fileData = medicalHistory.map((record) => ({
      name: record.name, // Assuming 'name' is the field storing the file name
      contentType: record.contentType,
      data: record.data, // Assuming 'data' is the field storing the binary data
    }));

    // Send the file data in the response
    res.status(200).json({
      status: "success",
      data: {
        healthRecords: fileData,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
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

    //console.log(doctor._id);

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
    const doctor = await doctorModel.findById(doctorId);
    
    if (!doctor) {
      res.status(404).json({
        message: "Doctor not found",
      });
      return;
    }
    const appointments = await appointment.find({ doctor: doctor._id});
    const patientIds = appointments.map((appointment) => appointment.patient);
    const patients = await patientModel.find({
      _id: { $in: patientIds },
      name: { $regex: new RegExp(name, "i") },
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

const scheduleFollowUpAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, followUp } = req.body;

    // Check if the appointment date is after the current date
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate <= currentDate) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment date must be in the future.",
      });
    }

    // Create the follow-up appointment
    const newAppointment = await appointment.create({
      doctor: doctorId,
      patient: patientId, 
      patientName: patientName,
      date: selectedDate,
      status: "scheduled", // Initial status for the appointment
      // Other appointment details as needed
    });

    // Update doctor's availableTimeSlots - Removing the scheduled slot
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      {
        $pull: { availableTimeSlots: selectedDate },
      },
      { new: true }
    );

    // Sending success response with appointment details and updated doctor info
    res.status(201).json({
      status: "success",
      data: {
        appointment: newAppointment,
        updatedDoctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "Invalid data sent or internal server error.",
    });
  }
};
const getAppointmentsWithStatusDone = async (req, res) => {
  try {
    const patientsWithDoneAppointments = await Patient.find({
      'appointments.status': 'done',
    }).populate({
      path: 'appointments',
      match: { status: 'done' },
    });

    const appointments = patientsWithDoneAppointments.reduce(
      (allAppointments, patient) => [...allAppointments, ...patient.appointments],
      []
    );

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const viewMedicalHistory = async (req, res) => {
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
    const patientsWithDoneAppointments = await appointment.find({
      doctor: doctorId,
      status: 'done',
    }).distinct('patient');

    const medicalHistories = await patientModel.find({
      _id: { $in: patientsWithDoneAppointments },
    }, 'medicalHistory');

    let pdfList = [];
    let imageList = [];

    medicalHistories.forEach((patient) => {
      patient.medicalHistory.forEach((history) => {
        const type = history.contentType;
        if (type === 'application/pdf') {
          pdfList.push(history);
        } else {
          imageList.push(history);
        }
      });
    });

    let result = {
      medicalHistoryPDF: pdfList,
      medicalHistoryImage: imageList,
    };

    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error('Error getting medical history', error.message);
    return res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const addPrescription = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in." });
    } else {
      id = decodedToken.name;
    }
  });

  const medicine = req.body
  //console.log(medicine)
  const patientID = req.params.id
  var medicines = []
  if(medicine){
      for(var med of medicine){
        const medID = await mediceneModel.findOne({Name: med.name})
        if(!medID) {
          res.status(200).send(`${med.name} is not available in the pharmacy`)
          return
      }
        else if(medID.quantity == 0) {
          res.status(200).send('This medicine is out of stock')
          return
        }
        medicines.push({
          medID: medID,
          dosage: med.dosage,
          duration: med.duration
        })
    }
    const newPrescription = new prescription({
      patient: patientID,
      medicine: medicines,
      doctor: id,
    })
    newPrescription.save().catch((err) => {console.error(err)})
    res.status(200).send('Prescription added successfully')
  }
  else res.status(200).send('There is no medicine added')

}

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentid;

    // Find the appointment by ID
    const appointments = await appointment.findById(appointmentId);

    // Check if the appointment exists
    if (!appointments) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the appointment status to "canceled"
    appointments.status = 'canceled';

    // Save the updated appointment
    await appointments.save();

    return res.json({ message: 'Appointment canceled successfully', appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const acceptOrRevokeFollowUp = async (req, res) => {
  try {
    const { followUpId, accept } = req.body;

    const followUp = await followUps.findById(followUpId);

    if (!followUp) {
      return res.status(404).json({ message: 'Follow-up request not found' });
    }

    const patient = await patientModel.findById(followUps.patient.id);
    const doctor = await doctorModel.findById(followUps.doctor.id);

    if (!patient || !doctor) {
      return res.status(404).json({ message: 'Patient or doctor not found' });
    }

    if (accept === true) {
      const newAppointment = new appointment({
        PatientId: followUps.patient,
        PatientName: followUps.patientName,
        DoctorId: followUps.doctor,
        Date: followUps.date,
        Duration: followUps.duration,
        Status: 'pending',
      });

      await docAvailableSlots.deleteMany({ DoctorId: followUps.doctor.id, Date: followUps.date });

      await newAppointment.save();

      followUp.approvalStatus = 'accepted';
      await followUps.save();

      return res.status(200).json({
        message: 'Follow-up request accepted',
        newAppointment,
      });
    } else {
      followUps.approvalStatus = 'rejected';
      await followUps.save();

      return res.status(200).json({
        message: 'Follow-up request rejected',
        followUp,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllPrescriptions = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let doctorId;

    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You are not logged in.' });
      } else {
        doctorId = decodedToken.name;
      }
    });

    //Remove the usage of populate, use findbyId since it's just doctor id. 
    const prescriptions = await prescriptionModel.find({ doctor: doctorId })
      .populate('patient', 'name') // Assuming patient ID is stored in prescriptions and is populated
      .populate('medicine.medID', 'Name'); // Assuming medicine ID is stored in prescriptions and is populated

    if (!prescriptions || prescriptions.length === 0) {
      return res.status(404).json({ message: 'No prescriptions found for this doctor.' });
    }

    const prescriptionsWithStatus = prescriptions.map(prescription => {
      const filledStatus = prescription.medicine.map(med => {
        return {
          name: med.medID.Name,
          dosage: med.dosage,
          duration: med.duration,
          filled: med.medID.quantity > 0, // Assuming quantity indicates availability in the pharmacy
        };
      });

      return {
        patient: prescription.patient.name,
        prescriptions: filledStatus,
      };
    });

    res.status(200).json({
      status: 'success',
      data: {
        prescriptions: prescriptionsWithStatus,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
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
  scheduleFollowUpAppointment,
  getAppointmentsWithStatusDone,
  viewMedicalHistory,
  addPrescription,
  cancelAppointment,
  acceptOrRevokeFollowUp,
  getAllPrescriptions,
};
