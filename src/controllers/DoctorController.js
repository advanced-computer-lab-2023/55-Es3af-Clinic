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
const mediceneModel = require("../Models/Medicine.js");
const prescription = require("../Models/Prescriptions.js");
const followUps = require("../Models/FollowUpRequests.js");
const packageModel = require("../Models/Packages.js");
const nodemailer = require("nodemailer");
const notificationModel = require("../Models/notifications.js");
const appointments = require("../Models/Appointments.js");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

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
  const patientId = req.params.patientId; // Patient's ID

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
    // const fileData = medicalHistory.map((record) => ({
    //   name: record.name, // Assuming 'name' is the field storing the file name
    //   contentType: record.contentType,
    //   data: record.data, // Assuming 'data' is the field storing the binary data
    // }));
    let pdfList = [];
    let imageList = [];

    for (let history of medicalHistory) {
      const type = history.contentType;
      if (type === "application/pdf") {
        pdfList.push(history);
      } else {
        imageList.push(history);
      }
    }

    let result = {
      medicalHistoryPDF: pdfList,
      medicalHistoryImage: imageList,
    };
    return res.status(200).json({ result: result, success: true });
    // Send the file data in the response
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     healthRecords: fileData,
    //   },
    // });
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
    const appointments = await appointment.find({ doctor: doctor._id });
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
    const amnt = Number(doctor.amountInWallet.toFixed(1));

    return res.status(200).send(amnt.toString() + " EGP");
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

function getTimeLocal(startTime) {
  //const [time, meridiem] = startTime.split(' '); // Split the time and the meridiem (am/pm)
  const [hours, minutes] = startTime.split(":").map(Number); // Extract hours and minutes as numbers

  let hours24 = hours; // Initialize the hours in 24-hour format
  // if(meridiem){
  //     if (meridiem.toLowerCase() === 'pm') {
  //     // If it's 'pm' and not '12 pm', convert to 24-hour format
  //     if (hours !== 12) {
  //       hours24 = (hours + 12) % 24;
  //     }
  //   } else if (meridiem.toLowerCase() === 'am' && hours === 12) {
  //     // If it's '12 am', convert to 24-hour format
  //     hours24 = 0;
  //   }
  // }

  const timeObject = new Date(); // Get today's date
  timeObject.setHours(hours24, minutes);
  return timeObject;
}

function millisecondsToTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

const scheduleFollowUpAppointment = async (req, res) => {
  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in." });
    } else {
      id = decodedToken.name;
    }
  });

  //hayzaharlo el available time slots yekhtar menha
  //console.log(req.body)
  const { patientID, patientName, slotTime } = req.body;

  var date = new Date(slotTime.date);

  //console.log(date)

  var startHour = slotTime.startTime.split(":");
  var endHour = slotTime.endTime.split(":");

  const startDate = new Date(`2000-01-01 ${slotTime.startTime}`);
  const endDate = new Date(`2000-01-01 ${slotTime.endTime}`);

  // var start = getTimeLocal(slotTime.startTime)
  // var end = getTimeLocal(slotTime.endTime).getTime()
  date.setHours(+startHour[0] + 2);
  //console.log(+startHour[0])
  //console.log(date)
  date.setMinutes(+startHour[1]);
  //console.log(+startHour[1])
  //console.log(date)
  //start = start.getTime()
  const duration = (endDate - startDate) / 60000;

  const newAppointment = new appointments({
    patient: patientID,
    patientName: patientName,
    doctor: id,
    date: new Date(date),
    duration: duration,
  });

  //console.log(newAppointment)

  const doc = await doctorModel.findByIdAndUpdate(id, {
    $pull: {
      availableTimeSlots: {
        date: new Date(slotTime.date),
        startTime: slotTime.startTime,
      },
    },
  });
  //console.log(doc)

  newAppointment.save().catch((err) => console.log(err));
  res.status(200).send("A follow up is scheduled successfully");
};
const getAppointmentsWithStatusDone = async (req, res) => {
  try {
    const patientsWithDoneAppointments = await Patient.find({
      "appointments.status": "done",
    }).populate({
      path: "appointments",
      match: { status: "done" },
    });

    const appointments = patientsWithDoneAppointments.reduce(
      (allAppointments, patient) => [
        ...allAppointments,
        ...patient.appointments,
      ],
      []
    );

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const viewMedicalHistory = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     var id;
//     jwt.verify(token, "supersecret", (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ message: "You are not logged in." });
//       } else {
//         id = decodedToken.name;
//       }
//     });
//     const doctorId = id;
//     const patientsWithDoneAppointments = await appointment.find({
//       doctor: doctorId,
//       status: 'done',
//     }).distinct('patient');

//     const medicalHistories = await patientModel.find({
//       _id: { $in: patientsWithDoneAppointments },
//     }, 'medicalHistory');

//     let pdfList = [];
//     let imageList = [];

//     medicalHistories.forEach((patient) => {
//       patient.medicalHistory.forEach((history) => {
//         const type = history.contentType;
//         if (type === 'application/pdf') {
//           pdfList.push(history);
//         } else {
//           imageList.push(history);
//         }
//       });
//     });

//     let result = {
//       medicalHistoryPDF: pdfList,
//       medicalHistoryImage: imageList,
//     };

//     return res.status(200).json({ result, success: true });
//   } catch (error) {
//     console.error('Error getting medical history', error.message);
//     return res.status(500).json({ message: 'Internal Server Error', success: false });
//   }
// };

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

  const medicine = req.body;
  //console.log(medicine)
  const patientID = req.params.id;
  var medicines = [];
  if (medicine) {
    for (var med of medicine) {
      const medID = await mediceneModel.findOne({ Name: med.name });
      if (!medID) {
        res.status(200).send(`${med.name} is not available in the pharmacy`);
        return;
      } else if (medID.quantity == 0) {
        res.status(200).send("This medicine is out of stock");
        return;
      }
      medicines.push({
        medID: medID,
        dosage: med.dosage,
        duration: med.duration,
        filled: false,
      });
    }
    const newPrescription = new prescription({
      patient: patientID,
      medicine: medicines,
      doctor: id,
    });
    newPrescription.save().catch((err) => {
      console.error(err);
    });
    res.status(200).send("Prescription added successfully");
  } else res.status(200).send("There is no medicine added");
};

async function doctorPrice(patientID, doctorUsername) {
  let sessionPrice;
  const doctor = await doctorModel.findOne({ username: doctorUsername });
  //console.log(`doctor in function is ${doctor}`);
  sessionPrice = doctor.hourlyRate * 1.1;
  //console.log(`patient ID in function ${patientID}`);
  const patient = await patientModel.findById(patientID);
  //console.log(`patient in function is ${patient}`);
  if (patient.package !== "none") {
    const package = await packageModel.findOne({ type: patient.package });
    //console.log(`package in function is ${package}`);
    sessionPrice = sessionPrice * (1 - package.sessionDiscount);
    sessionPrice = Number(sessionPrice.toFixed(1));
  }
  return sessionPrice;
}

function properDateAndTime(dateAndTime) {
  const date = new Date(dateAndTime);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getUTCHours() + 1;
  const minute = date.getMinutes();
  return `${day}/${month}/${year} at ${hour}:${minute}`;
}
const parseTime = (timeString) => {
  const [time, meridiem] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Adjust hours for PM
  const adjustedHours = meridiem === "PM" ? hours + 12 : hours;

  return { hours: adjustedHours, minutes };
};
const cancelAppointment = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });
  try {
    const appointmentId = req.body.appointmentid;
    let alertM = "";
    // Find the appointment by ID
    const appointments = await appointment.findById(appointmentId);

    // Check if the appointment exists
    if (!appointments) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the appointment status to "canceled"
    appointments.status = "canceled";
    await appointments.save();
    const appointmentTime = appointments.date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endt = new Date(
      appointments.date.getTime() + appointments.duration * 60000
    );
    const end = endt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    await doctorModel.findOneAndUpdate(
      { _id: appointments.doctor },
      {
        $push: {
          availableTimeSlots: {
            date: appointments.date,
            startTime: appointmentTime,
            endTime: end,
          },
        },
      }
    );
    const twentyFourHoursFromNow = new Date();
    twentyFourHoursFromNow.setHours(twentyFourHoursFromNow.getHours() + 24);

    if (appointments.date >= twentyFourHoursFromNow) {
      const patient = await patientModel.findById(appointments.patient);
      const doctor = await doctorModel.findById(appointments.doctor);
      const price = await doctorPrice(appointments.patient, doctor.username);

      patient.amountInWallet += price;
      await patient.save();

      alertM =
        "A total of " +
        price.toString() +
        "EGP was refunded to the patient's wallet";

      const dateAndTime = properDateAndTime(appointments.date);
      const patientMessage = `Doctor ${
        doctor.name
      } cancelled your appointment on ${dateAndTime}. A total of ${price.toString()}  EGP was refunded to your wallet`;
      const doctorMessage = `You cancelled your appointment with Patient ${patient.name} on ${dateAndTime}.`;

      const emailToPatient = await transporter.sendMail({
        from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
        to: patient.email, // list of receivers
        subject: "Cancelled Appointment", // Subject line
        text: patientMessage, // plain text body
        html: `<b>${patientMessage}</b>`, // html body
      });
      const patientNotif = new notificationModel({
        receivers: patient._id,
        message: patientMessage,
      });
      patientNotif.save().catch();

      const emailToDoctor = await transporter.sendMail({
        from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
        to: doctor.email, // list of receivers
        subject: "Cancelled Appointment", // Subject line
        text: doctorMessage, // plain text body
        html: `<b>${doctorMessage}</b>`, // html body
      });
      const doctorNotif = new notificationModel({
        receivers: doctor._id,
        message: doctorMessage,
      });
      doctorNotif.save().catch();
    }
    alertM = "Appointment canceled successfully \n" + alertM;
    return res.json({ message: alertM, appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const acceptOrRevokeFollowUp = async (req, res) => {
  try {
    const { followUpId, accept } = req.body;

    const followUp = await followUps.findById(followUpId);

    if (!followUp) {
      return res.status(404).json({ message: "Follow-up request not found" });
    }

    const patient = await patientModel.findById(followUps.patient.id);
    const doctor = await doctorModel.findById(followUps.doctor.id);

    if (!patient || !doctor) {
      return res.status(404).json({ message: "Patient or doctor not found" });
    }

    if (accept === true) {
      const newAppointment = new appointment({
        PatientId: followUps.patient,
        PatientName: followUps.patientName,
        DoctorId: followUps.doctor,
        Date: followUps.date,
        Duration: followUps.duration,
        Status: "pending",
      });

      await docAvailableSlots.deleteMany({
        DoctorId: followUps.doctor.id,
        Date: followUps.date,
      });

      await newAppointment.save();

      followUp.approvalStatus = "accepted";
      await followUps.save();

      return res.status(200).json({
        message: "Follow-up request accepted",
        newAppointment,
      });
    } else {
      followUps.approvalStatus = "rejected";
      await followUps.save();

      return res.status(200).json({
        message: "Follow-up request rejected",
        followUp,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//const prescriptionModel = require('../Models/Prescriptions.js');

const getAllPrescriptions = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let doctorId;

    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        doctorId = decodedToken.name;
      }
    });

    const prescriptions = await prescription
      .find({ doctor: doctorId })
      .populate("patient", "name") // Assuming patient ID is stored in prescriptions and is populated
      .populate("medicine.medID", "Name"); // Assuming medicine ID is stored in prescriptions and is populated

    if (!prescriptions || prescriptions.length === 0) {
      return res.status(200).send([]);
    }
    // console.log(prescriptions)

    const prescriptionsWithStatus = prescriptions.map((prescription) => {
      // Map through each prescription
      const filledStatus = prescription.medicine.map((med) => {
        // For each medicine in the prescription, create a modified structure
        return {
          medID: med.medID,
          name: med.Name,
          dosage: med.dosage,
          duration: med.duration,
          //filled: med.medID.quantity > 0 ? "filled" : "unfilled",
        };
      });

      return {
        id: prescription._id,
        patient: prescription.patient.name,
        prescriptions: filledStatus,
        status: prescription.status,
      };
    });

    res.status(200).json({
      status: "success",
      message: "Prescription added successfully.",
      data: {
        prescriptions: prescriptionsWithStatus,
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

const editDosage = async (req, res) => {
  try {
    const { prescriptionId, medicineId, newDosage } = req.body;
    // Log the parameters to ensure they are received correctly
    //  console.log('Prescription ID:', prescriptionId);
    //  console.log('Medicine ID:', medicineId);
    //  console.log('New Dosage:', newDosage);

    // Validate the request parameters
    if (
      !mongoose.Types.ObjectId.isValid(prescriptionId) ||
      !mongoose.Types.ObjectId.isValid(medicineId) ||
      !newDosage
    ) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    // Find the prescription by ID
    const Prescription = await prescription.findById(prescriptionId);
    //console.log(Prescription)

    // Check if the prescription exists
    // if (!Prescription) {
    //   return res.status(404).json({ message: 'Prescription not found' });
    // }

    // Find the medicine in the prescription
    const medicineToUpdate = Prescription.medicine.find(
      (med) => med.medID.toString() === medicineId.toString()
    );

    // Check if the medicine exists in the prescription
    // if (!medicineToUpdate) {
    //   return res.status(404).json({ message: 'Medicine not found in the prescription' });
    // }

    // Update the dosage
    medicineToUpdate.dosage = newDosage;

    // Save the updated prescription
    await Prescription.save();
    //console.log(Prescription)

    return res.status(200).json({ message: "Dosage updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const editPrescription = async (req, res) => {
  const { prescriptionId, newMedicines } = req.body;

  try {
    // Fetch the prescription from the database
    const Prescription = await prescription.findById(prescriptionId);

    if (!Prescription) {
      return res.status(404).json({ message: "Prescription not found" });
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Check if the prescription is unfilled
    if (Prescription.status === "filled") {
      return res
        .status(400)
        .json({ message: "Cannot edit a filled prescription" });
    }

    // Add new medicines to the prescription
    Prescription.medicine.push(...newMedicines);

    // Save the updated prescription
    await Prescription.save();

    res.status(200).json({ message: "Prescription updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating prescription", error: error.message });
  }
};

const rescheduleAnAppointment = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });

  const prevappointmentid = req.body.prevappointmentid;
  const newAppointmentid = req.body.appointmentid;
  // Add this field for the new date

  try {
    // if (id == '') {
    //   const token = req.cookies.jwt;
    //   jwt.verify(token, 'supersecret', (err, decodedToken) => {
    //     if (err) {
    //       res.status(401).json({ message: "You are not logged in." })
    //     }
    //     else {
    //       id = decodedToken.name;
    //     }
    //   });
    // }

    //const patient = await patientModel.findById(prevappointmentid.patient);

    // Find the existing appointment
    const existingAppointment = await appointment.findById(prevappointmentid);
    const oldDate = existingAppointment.date;
    // console.log(existingAppointment);
    const doctor = await doctorModel.findById(existingAppointment.doctor);
    //console.log(doctor);
    const slotStartH = existingAppointment.date.getHours();
    const slotStartM = existingAppointment.date.getMinutes();
    const slotStart = `${String(slotStartH).padStart(2, "0")}:${String(
      slotStartM
    ).padStart(2, "0")}`;
    const slotDate = existingAppointment.date.toISOString().split("T")[0];
    //console.log(slotDate)
    const slotEndH = Math.floor(
      (slotStartH * 60 + slotStartM + existingAppointment.duration) / 60
    );
    const slotEndM =
      (slotStartH * 60 + slotStartM + existingAppointment.duration) % 60;

    // Combine slotEndH and slotEndM into slotEnd
    const slotEnd = `${String(slotEndH).padStart(2, "0")}:${String(
      slotEndM
    ).padStart(2, "0")}`;

    // Use the existing time slot information to calculate duration
    const matchingTimeSlot = doctor.availableTimeSlots.find(
      (slot) => slot._id == newAppointmentid
    );
    //console.log(matchingTimeSlot)
    const startTime = matchingTimeSlot.startTime;
    const endTime = matchingTimeSlot.endTime;
    //console.log(startTime,endTime);

    const startTimeObject = parseTime(startTime);
    const endTimeObject = parseTime(endTime);

    const [startHour, startMinute] = [
      startTimeObject.hours,
      startTimeObject.minutes,
    ];
    const [endHour, endMinute] = [endTimeObject.hours, endTimeObject.minutes];

    // console.log("startHour:", startHour);
    // console.log("startMinute:", startMinute);
    // console.log("endHour:", endHour);
    // console.log("endMinute:", endMinute);

    var duration = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    if (duration < 0) duration = 60;
    // Update the appointment with the new date or time slot
    const existingAppointmentDate = new Date(matchingTimeSlot.date);
    existingAppointmentDate.setHours(startHour);
    existingAppointmentDate.setMinutes(startMinute);
    //console.log(existingAppointmentDate)
    existingAppointment.date = existingAppointmentDate;
    existingAppointment.duration = duration;

    // Save the updated appointment
    const updatedAppointment = await existingAppointment.save();
    //console.log(updatedAppointment)

    // Update doctor's availableTimeSlots (assuming you have a doctorId available)
    await doctorModel.findOneAndUpdate(
      { _id: existingAppointment.doctor },
      {
        $pull: { availableTimeSlots: { _id: newAppointmentid } },
      }
    );

    // Add the rescheduled appointment to availableTimeSlots
    await doctorModel.findOneAndUpdate(
      { _id: existingAppointment.doctor },
      {
        $push: {
          availableTimeSlots: {
            date: slotDate,
            startTime: slotStart,
            endTime: slotEnd,
          },
        },
      }
    );

    const patient = await patientModel.findById(existingAppointment.patient);

    const dateAndTime = properDateAndTime(existingAppointmentDate.date);
    const patientMessage = `Doctor ${
      doctor.name
    } rescheduled your appointment with them on ${properDateAndTime(
      oldDate
    )} to ${dateAndTime}.`;
    const doctorMessage = `You rescheduled your appointment with patient ${
      existingAppointment.patientName
    } on ${properDateAndTime(oldDate)} to ${dateAndTime}.`;

    const emailToPatient = await transporter.sendMail({
      from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: patient.email, // list of receivers
      subject: "Rescheduled Appointment", // Subject line
      text: patientMessage, // plain text body
      html: `<b>${patientMessage}</b>`, // html body
    });
    const patientNotif = new notificationModel({
      receivers: patient._id,
      message: patientMessage,
    });
    patientNotif.save().catch();

    const emailToDoctor = await transporter.sendMail({
      from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: doctor.email, // list of receivers
      subject: "Rescheduled Appointment", // Subject line
      text: doctorMessage, // plain text body
      html: `<b>${doctorMessage}</b>`, // html body
    });
    const doctorNotif = new notificationModel({
      receivers: doctor._id,
      message: doctorMessage,
    });
    doctorNotif.save().catch();

    res.status(200).send("Appointment was rescheduled successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while rescheduling the appointment");
  }
};

async function viewFollowUpRequests(doctorId) {
  try {
    // Find the doctor by ID
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return { success: false, message: "Doctor not found" };
    }

    // Find appointments for the doctor marked as follow-ups
    const followUpAppointments = await appointment
      .find({
        doctor: doctorId,
        type: "Follow-up",
        // You can add more conditions if needed
      })
      .populate("patient", "name"); // Populate patient details if needed

    return { success: true, followUpAppointments };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function acceptFollowUpRequest(doctorId, patientId, followUpDate) {
  try {
    // Find the doctor by ID
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return { success: false, message: "Doctor not found" };
    }

    // Check if the follow-up date is available in doctor's schedule
    const availableSlots = doctor.availableTimeSlots.map((slot) =>
      slot.toString()
    );
    const followUpDateString = followUpDate.toString();

    if (!availableSlots.includes(followUpDateString)) {
      return { success: false, message: "Follow-up date not available" };
    }

    // Remove the follow-up date from available time slots
    doctor.availableTimeSlots = doctor.availableTimeSlots.filter(
      (slot) => slot.toString() !== followUpDateString
    );

    // Save the updated doctor's schedule
    await doctor.save();

    // Create a new appointment for the follow-up
    const newAppointment = new appointment({
      doctor: doctorId,
      patient: patientId,
      date: followUpDate,
      type: "Follow-up",
      // You can add more properties as needed
    });

    // Save the new appointment
    await newAppointment.save();

    return { success: true, message: "Follow-up request accepted" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function rejectFollowUpRequest(appointmentId) {
  try {
    // Find the appointment by ID
    const appointment = await appointment.findById(appointmentId);

    if (!appointment) {
      return { success: false, message: "Appointment not found" };
    }

    // Check if the appointment is a follow-up
    if (appointment.type !== "Follow-up") {
      return { success: false, message: "This appointment is not a follow-up" };
    }

    // Update the appointment status to "rejected"
    appointment.status = "rejected";
    await appointment.save();

    return {
      success: true,
      message: "Follow-up request rejected successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
const getDoctor = async (req, res) => {
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
    const doctor = await doctorModel.findById(id);
    res.send(doctor);
  } catch (e) {
    res.status(400).send(e);
  }
};
const getName = async (req, res) => {
  const pID = req.params.patientID;
  const patient = await patientModel.findById(pID);
  res.status(200).send(patient.name);
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
  addPrescription,
  cancelAppointment,
  acceptOrRevokeFollowUp,
  getAllPrescriptions,
  editDosage,
  editPrescription,
  rescheduleAnAppointment,
  acceptFollowUpRequest,
  viewFollowUpRequests,
  rejectFollowUpRequest,
  getDoctor,
  getName,
};
