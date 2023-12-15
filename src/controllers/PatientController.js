const patientModel = require("../Models/Patient.js");
const familyMemberModel = require("../Models/FamilyMembers.js");
const doctorModel = require("../Models/Doctor.js");
const userModel = require("../Models/user.js");
const packageModel = require("../Models/Packages.js");
const appointmentModel = require("../Models/Appointments.js");
const PrescriptionsModel = require("../Models/Prescriptions.js");
const notificationModel = require("../Models/notifications.js");
const followUpModel = require("../Models/FollowUpRequests.js");
const multer = require("multer");
const fs = require("fs");
const familyMembersAcc = require("../Models/familyMembersAccount.js");
const { error } = require("console");
const { default: mongoose } = require("mongoose");
const { disconnect } = require("process");
const stripe = require("stripe")(
  "sk_test_51NxqUnLoGRs62ex4Yxz9G8uKeNFYxSs27BlQznMivk0eBNxx7eZzj6X1Q2ZCYEhOmLOhbGwVLNMzLwMsV1Xf4fZv00ert3YhEW"
);

const bcrypt = require("bcrypt");
const upload = multer({ dest: "uploads/" });
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const test = async (req, res) => {
  const app = await appointmentModel.find({ date: req.query.date });
  res.status(200).send(app);
};

const getPatient = async (req, res) => {
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
    const patient = await patientModel.findById(id);
    res.send(patient);
  } catch (e) {
    res.status(400).send(e);
  }
};
const addFamilyMemberByUsername = async (req, res) => {
  // const patient = req.params.username;
  // const patientID = await userModel.findOne({ username: patient });

  // if (patientID === null) {
  //   console.log(patient);
  //   res.status(404).send("Patient not found");
  //   return;
  // }

  const email = req.body.email;
  const mobile = req.body.mobile;
  var familyMemberUserID = null;
  try {
    const token = req.cookies.jwt;
    var patientID;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        patientID = decodedToken.name;
      }
    });
    if (email != "")
      familyMemberUserID = await patientModel.findOne({ email: email }).exec();
    else if (mobile != "")
      familyMemberUserID = await patientModel
        .findOne({ mobile: mobile })
        .exec();
    if (familyMemberUserID == null || familyMemberUserID.__t != "patient") {
      res
        .status(404)
        .send("There's no account with the corresponding email/phone");
      return;
    } else {
      if (
        (await familyMembersAcc.findOne({ Id: familyMemberUserID._id })) !==
          null ||
        (await familyMembersAcc.findOne({
          patient: familyMemberUserID._id,
        })) !== null
      ) {
        res.status(200).send("Family member already exists");
        return;
      } else {
        const member = new familyMembersAcc({
          Id: familyMemberUserID._id.valueOf(),
          relationToPatient: req.body.relationToPatient,
          patient: patientID, //id zy ma heya
        });
        res.status(200).send("Family Member Added Successfully");
        member.save().catch((err) => console.log(err));
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//working fine and testing fine
const addFamilyMember = async (req, res) => {
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
    // const patient = req.query.patient;
    const patientID = await userModel.findById(id);
    //console.log(req.body);

    const member = new familyMemberModel({
      name: req.body.name,
      nationalID: req.body.nationalID,
      age: req.body.age,
      gender: req.body.gender,
      relationToPatient: req.body.relationToPatient,
      patient: patientID._id.valueOf(), //id zy ma heya
    });
    //console.log(`family member is ${member}`);
    //var patient = member.patient
    //console.log(`patient is ${patient}`)

    familyMemberModel
      .find({ patient: member.patient })
      .exec()
      .then((document) => {
        //console.log(`family members are ${document}`);
        familyMemberModel
          .findOne({ name: member.name })
          .exec()
          .then((document2) => {
            if (document2) {
              //console.log("Family member already exists");
              res.status(200).send("Family member already exists");
              return;
            } else {
              member.save().catch((err) => console.log(err));
              //console.log("Family member added");
              res.status(200).send("Family member added");
            }
          })
          .catch((err) => {
            console.error(err);
          })

          .catch((err) => {
            console.error(err);
          });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//working fine testing fine
const viewFamilyMembers = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    var neededPatient;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        neededPatient = decodedToken.name;
      }
    });
    const neededPatientID = await userModel.findById(neededPatient);

    if (!neededPatientID) {
      //console.log("Patient not found.");
      res.status(404).send("Patient not found");
      return;
    }

    //console.log("Patient ID:", neededPatientID._id);

    const familyMemberAcc = await familyMembersAcc.find({
      patient: neededPatientID._id,
    });
    const familyMemberAccRev = await familyMembersAcc.find({
      Id: neededPatientID._id,
    });

    familyMemberModel
      .find({ patient: neededPatientID._id })
      .exec()
      .then(async (result) => {
        if (
          Object.keys(result).length === 0 &&
          familyMemberAcc.length <= 0 &&
          familyMemberAccRev.length <= 0
        ) {
          res.status(200).send("You don't have any family members added");
        } else {
          const familyMemberData = [];

          if (familyMemberAcc.length > 0) {
            // Collect data from result2 and select specific fields including "relationToPatient"
            const result2Ids = familyMemberAcc.map((acc) => acc.Id);
            const result2 = await userModel
              .find({ _id: { $in: result2Ids } })
              .select("name dateOfBirth gender package");
            const result2WithRelation = result2.map((user, index) => ({
              ...user.toObject(),
              relationToPatient: familyMemberAcc[index].relationToPatient,
            }));
            familyMemberData.push(result2WithRelation);
          }

          if (familyMemberAccRev.length > 0) {
            // Collect data from result3 and select specific fields including "relationToPatient"
            const result3Ids = familyMemberAccRev.map((acc) => acc.patient._id);
            const result3 = await userModel
              .find({ _id: { $in: result3Ids } })
              .select("name dateOfBirth gender package");
            const result3WithRelation = result3.map((user, index) => {
              let relationToPatient =
                familyMemberAccRev[index].relationToPatient;
              if (relationToPatient === "Husband") {
                relationToPatient = "Wife";
              } else if (relationToPatient === "Wife") {
                relationToPatient = "Husband";
              }
              return { ...user.toObject(), relationToPatient };
            });
            familyMemberData.push(result3WithRelation);
          }

          // Collect data from result (existing family members)
          familyMemberData.push(result);

          res.status(200).json(familyMemberData);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Error finding patient:", error);
    res.status(500).send("Internal Server Error");
  }
};

//working fine testing fine
const viewDoctors = async (req, res) => {
  //var patient = req.query.patient; //username

  const token = req.cookies.jwt;
  var id = ""; //patient id
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log('got the id')
    }
  });

  doctorModel
    .find({})
    .exec()
    .then(async (docResult) => {
      if (Object.keys(docResult).length === 0) {
        res.status(200).send("There is no doctors");
      } else {
        const docArr = [];
        const docPrice = [];
        for (const doctor of docResult) {
          docArr.push(doctor);
          var price;
          try {
            //console.log(`doctor is ${doctor}`);
            price = await doctorPrice(id, doctor.username);
            //console.log(`returned price from function is ${price}`);
            docPrice.push(price);
          } catch (err) {
            console.error(err);
          }
        }
        const docInfo = [];
        for (let i = 0; i < docArr.length; i++) {
          let info = {
            id: docArr[i]._id.valueOf(),
            name: docArr[i].name,
            speciality: docArr[i].speciality,
            price: docPrice[i],
          };
          docInfo.push(info);
        }
        res.status(200).send(docInfo);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

//working fine
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

async function viewDoctorDetails(doctor, patientID) {
  //const patient = patientModel.findOneAndDelete({username: patientUsername})
  var details = {
    id: doctor._id,
    name: doctor.name,
    speciality: doctor.speciality,
    price: await doctorPrice(patientID, doctor.username),
  };
  //console.log(`details ${details}`);
  return details;
}

//working and testing fine
const searchByNameSpec = async (req, res) => {
  const name = req.query.name;
  const spec = req.query.speciality;

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log('got the id')
    }
  });

  //const patientUsername = "farouhaTe3bet";
  //console.log(`name ${name} spec ${spec}`);
  var search = {};
  if (name) {
    search.name = name;
    //console.log(search);
  }
  if (spec) {
    search.speciality = spec;
  }
  try {
    // console.log(search);
    const doctor = await doctorModel.find(search);
    //console.log(`doctors ${doctor}`);
    if (Object.keys(doctor).length === 0) {
      res.status(200).send(`There is no results for ${search}`);
    } else {
      const info = [];
      for (var doc of doctor) {
        info.push(await viewDoctorDetails(doc, id));
      }
      //console.log(`all info ${info}`);
      res.status(200).send(info);
    }
  } catch (err) {
    console.error(err);
  }
};

const getAllSpecialities = async (req, res) => {
  const specialities = await doctorModel
    .find({}, { speciality: 1, _id: 0, __t: 0 })
    .distinct("speciality");
  //console.log(specialities);
  res.status(200).send(specialities);
};

const searchBySpecDate = async (req, res) => {
  const { date, speciality } = req.query;

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      console.log("You are not logged in.");
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log(`got the id: ${id}`)
    }
  });

  //const patientID = req.params.id
  //console.log(`spec: ${speciality}`);
  if (date) {
    var date2 = new Date(date);
    date2.setHours(date2.getHours() + 2);

    //console.log(date2);
  }

  try {
    var appointments = []; //ids doctors that are busy
    var doctors = [];
    var result = [];

    if (speciality && !date) {
      //if there's no date, working fine
      //console.log("speciality only");
      var doctor = await doctorModel.find({ speciality: speciality });
      if (doctor.length > 0) {
        for (var d of doctor) {
          //console.log(`id is ${id}`)
          var details = await viewDoctorDetails(d, id);
          //console.log(details);
          doctors.push(details);
        }
        res.status(200).send(doctors);
      } else {
        res.status(200).send("no doctors with this speciality");
      }
    } else if (date) {
      const appoint = await appointmentModel.find({
        $or: [{ status: "pending" }, { status: "currently working" }],
      }); //get all appointments of date greater than or equal
      //console.log(`result of find is ${appoint}`);
      if (appoint.length < 1) {
        res.status(200).send("no appointments at that time");
      } else {
        for (var app of appoint) {
          var newDate = new Date(app.date);
          newDate.setMinutes(newDate.getMinutes() + app.duration);

          // console.log(app.date);
          // console.log(`^^ start date,   vv end date`);
          // console.log(newDate);
          if (newDate > date2 && date2 > app.date) {
            appointments.push(app.doctor._id.valueOf());
            // console.log(
            //   `deen om el id beta3 el doctor${app.doctor._id.valueOf()}`
            // );
          }
        }
        const allDoctors = await doctorModel.find({});
        for (var doc of allDoctors) {
          var docid = doc._id.valueOf();
          if (appointments.length == 0) {
            var details = await viewDoctorDetails(doc, id);
            //console.log(`deen om el appointments fadya ${details}`);
            doctors.push(details);
          } else if (!appointments.includes(docid)) {
            var details = await viewDoctorDetails(doc, id);
            //console.log(
            //   `om el appointments ${appointments} wel details ${details}`
            // );
            doctors.push(details);
          }
        }
      }
      //console.log(`else if date`);
      //console.log(doctors);
    }
    //console.log(`finished else if date`);

    if (date && speciality) {
      for (doc of doctors) {
        //console.log(doc)
        if (doc.speciality == speciality) {
          // var details = await viewDoctorDetails(doc, id);
          // //console.log(details);
          // result.push(details);
          result.push(doc);
        }
      }
      res.status(200).send(result);
    } else if (date && !speciality) {
      //console.log(`else if date only`);
      res.status(200).send(doctors);
    }
  } catch (err) {
    console.error(err);
  }
};

//working fine testing fine
const viewDocInfo = async (req, res) => {
  const doctorID = req.params.id; //need to work on this
  //const patient = "farouhaTe3bet"; //username need to change to id

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log('got the id')
    }
  });

  doctorModel
    .findById(doctorID)
    .exec()
    .then(async (info) => {
      var price = await doctorPrice(id, info.username);

      var docInfo = {
        name: info.name,
        affiliation: info.affiliation,
        educationBackground: info.educationBackground,
        speciality: info.speciality,
        price: price,
      };
      //console.log(docInfo);
      res.status(200).send(docInfo);
    })
    .catch((err) => {
      console.error(err);
    });
};

//not working dk why
const filterAppointmentsByDateAndStatus = async (req, res) => {
  const { date, status } = req.query;
  //const patientID = req.params.id;
  let currentDate = new Date();

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      // console.log('got the id')
    }
  });

  try {
    let filter = { patient: id, date: { $gte: currentDate } };
    //console.log(filter)
    if (date) {
      filter.date = { $gte: date };
    }
    if (status) {
      filter.status = status;
    }
    //console.log(`filter: ${filter.date} and ${filter.status}`)
    const appointments = await appointmentModel
      .find(filter)
      .populate("doctor", "name -_id -__t");
    //console.log(`appointments: ${appointments}`);

    var allApps = [];

    if (appointments) {
      for (var app of appointments) {
        //console.log(app.doctor)
        const doctor = await doctorModel.findOne({ name: app.doctor.name });
        var result = {
          name: doctor.name,
          duration: app.duration,
          status: app.status,
          date: app.date,
        };
        allApps.push(result);
      }
      res.status(200).send(allApps);
    } else {
      res.status(200).send("no results");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const viewPrescriptions = async (req, res) => {
  //const neededPatient = req.params.id;

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log('got the id')
    }
  });

  //console.log(`Patient is ${id}`);
  PrescriptionsModel.find({patient: id})
    .populate("doctor", "name -_id -__t")
    .exec()
    .then((result) => {
      if (!result) {
        res.status(200).send("You don't have any prescriptions added");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const filterprescriptionsbydatestatusdoctor = async (req, res) => {
  const { date, doctor, status } = req.query;

  const token = req.cookies.jwt;
  var id = "";
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      //console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      //console.log('got the id')
    }
  });

  //const patientid = req.params.id;
  try {
    let filter = { patient: id };
    if (date) {
      filter.date = date;
    }
    if (status) {
      filter.status = status;
    }
    if (doctor) {
      const doctor1 = await userModel.findOne({ name: doctor });
      if (doctor1) {
        filter.doctor = doctor1.id;
      }
    }
    const prescription = await PrescriptionsModel.find(filter).populate(
      "doctor",
      "name -_id -__t"
    );
    res.status(200).send(prescription);
  } catch (err) {
    console.error(err);
  }
};

const getPatients = async (req, res) => {
  //retrieve all patients from the database
  const patients = await patientModel.find({});
  //console.log(patients);
  res.status(200).send(patients);
};

const getAmountInWallet = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "You are not logged in." });
    }

    const decodedToken = jwt.verify(token, "supersecret");
    const userId = decodedToken.name;
    const patient = await patientModel.findById(userId);
    const amnt = Number(patient.amountInWallet.toFixed(1));
    return res.status(200).send(amnt.toString() + " EGP");
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Invalid token or you are not logged in." });
  }
};

const subscribeToAHealthPackage = async (req, res) => {
  const packageID = req.body.packageID;
  const patients = req.body.patients;
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 1);
  var response = "";
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
    const patient1 = await patientModel.findById(id);
    if (patient1) {
      if (
        patient1.package == packageID &&
        patient1.packageStatus == "Subscribed With Renewal Date"
      ) {
        response +=
          patient1.name + "'s subscribtion to this package is renewed \n";
      } else {
        patient1.package = packageID;
        patient1.packageRenewalDate = renewalDate;
        patient1.packageStatus = "Subscribed With Renewal Date";
        await patient1.save();
        response += patient1.name + " is subscribed to package successfully \n";
      }
    } else {
      return res.status(404).send("Patient Not Found");
    }
    for (const patientID of patients) {
      const patient = await patientModel.findOne({ _id: patientID });
      if (patient) {
        if (
          patient.package == packageID &&
          patient.packageStatus == "Subscribed With Renewal Date"
        ) {
          response +=
            patient.name + "'s subscribtion to this package is renewed \n";
        } else {
          patient.package = packageID;
          patient.packageRenewalDate = renewalDate;
          patient.packageStatus = "Subscribed With Renewal Date";
          await patient.save();
          response +=
            patient.name + " is subscribed to package successfully \n";
        }
      }
    }
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating patient packages");
  }
};

const appointmentsForDoc = async (req, res) => {
  const doctorID = req.query.doctor; //doctor id
  const doctor = await doctorModel.findById(doctorID);
  const appointments = await appointmentModel.find({ doctor: doctor });
};

//farah
const withdrawFromWallet = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in." });
    } else {
      id = decodedToken.name;
    }
  });
  const amountToWithdraw = req.body.amount;
  try {
    const patient = await patientModel.findById(id).exec();
    //console.log(patient.amountInWallet)
    if (patient.amountInWallet < amountToWithdraw) {
      return res.status(200).send("Not suffecient funds in wallet");
    } else {
      patient.amountInWallet = patient.amountInWallet - amountToWithdraw;
      await patient.save();
      return res.status(200).send("Amount deducted successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while withdrawing");
  }
};

const BookAnAppointment = async (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  const doctorid = req.body.doctorid;
  const appointmentid = req.body.appointmentid;
  const amount = req.body.amount;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });

  try {
    if (id == "") {
      const token = req.cookies.jwt;
      jwt.verify(token, "supersecret", (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "You are not logged in." });
        } else {
          id = decodedToken.name;
        }
      });
      name = "";
    }
    const patient = await patientModel.findById(id);
    const doctor = await doctorModel.findById(doctorid);

    const matchingTimeSlot = doctor.availableTimeSlots.find(
      (slot) => slot._id == appointmentid
    );
    const startTime = matchingTimeSlot.startTime;
    const endTime = matchingTimeSlot.endTime;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const duration = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    if (name == "") name = patient.name;
    const newAppointment = new appointmentModel({
      patient: id,
      patientName: name, // Replace with the actual patient name
      doctor: doctorid, // Replace with the actual doctor ID
      date: matchingTimeSlot.date, // Replace with the actual date
      duration: duration, // Replace with the actual duration
      // Status will default to 'pending' if not provided
    });

    // Save the appointment to the database
    try {
      const result = await newAppointment.save();
      //console.log(result);
    } catch (err) {
      console.error(err);
    }

    doctorModel
      .updateOne(
        { _id: doctorid },
        {
          $pull: { availableTimeSlots: { _id: appointmentid } },
          $set: { amountInWallet: amount },
        }
      )
      .then((result) => {
        //console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });

    const dateAndTime = properDateAndTime(newAppointment.date);

    const patientMessage = `You have booked an appointment with doctor ${doctor.name} specialized in ${doctor.speciality} on ${dateAndTime}. The total price is ${amount}.`;
    const doctorMessage = `Patient ${name} has booked an appointment with you on ${dateAndTime}. The total price is ${amount}.`;

    const emailToPatient = await transporter.sendMail({
      from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: patient.email, // list of receivers
      subject: "Booked Appointment", // Subject line
      text: patientMessage, // plain text body
      html: `<b>${patientMessage}</b>`, // html body
    });

    const patientNotif = new notificationModel({
      receivers: patient._id,
      message: patientMessage,
    });

    patientNotif.save().catch((err) => {
      console.error(err);
    });

    const doctorNotif = new notificationModel({
      receivers: doctor._id,
      message: doctorMessage,
    });

    doctorNotif.save().catch((err) => {
      console.error(err);
    });

    const emailToDoctor = await transporter.sendMail({
      from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: doctor.email, // list of receivers
      subject: "Booked Appointment", // Subject line
      text: doctorMessage, // plain text body
      html: `<b>${doctorMessage}</b>`, // html body
    });

    res.status(200).send("Appointment was booked successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while booking the appointment");
  }
};

function properDateAndTime(dateAndTime) {
  const date = new Date(dateAndTime);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getUTCHours();
  const minute = date.getMinutes();
  return `${day}/${month}/${year} at ${hour}:${minute}`;
}
const requestFollowUp = async (req, res) => {
  const doctorid = req.body.doctorid;
  const prevAppointmentid = req.body.appointmentid;
  const followUpAppId = req.body.followAppId;

  try {
    const doctor = await doctorModel.findById(doctorid);
    const prevAppointment = await appointmentModel.findById(prevAppointmentid);

    const matchingTimeSlot = doctor.availableTimeSlots.find(
      (slot) => slot._id == followUpAppId
    );
    const startTime = matchingTimeSlot.startTime;
    const endTime = matchingTimeSlot.endTime;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const duration = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const isThere = await followUpModel.find({
      pastAppointement: prevAppointmentid,
      date: matchingTimeSlot.date,
    });
    if (isThere.length != 0) {
      res.status(200).send("You already requested a follow up at this time");
      return;
    }
    const followUp = new followUpModel({
      patient: prevAppointment.patient,
      patientName: prevAppointment.patientName, // Replace with the actual patient name
      doctor: doctorid, // Replace with the actual doctor ID
      date: matchingTimeSlot.date, // Replace with the actual date
      duration: duration, // Replace with the actual duration
      pastAppointement: prevAppointmentid,
      // Status will default to 'pending' if not provided
    });
    await followUp.save();

    res.status(200).send("FollowUp Scheduled Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while requesting a follow-up");
  }
};

const uploadMedicalHistory = async (req, res) => {
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
          .send(`Medical history file uploaded for ${username}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
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
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Patient not found", success: false });
    }
    const medicalHistory = patient.medicalHistory;
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
  } catch (error) {
    console.error("Error getting medical history", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const removeMedicalHistory = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "You are not logged in.", success: false });
      } else {
        id = decodedToken.name;
      }
    });

    const patient = await patientModel.findById(id);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Patient not found", success: false });
    }

    const medicalHistoryIdToRemove = req.params.medicalHistoryId;

    const historyIndex = patient.medicalHistory.findIndex(
      (history) => history._id.toString() === medicalHistoryIdToRemove
    );

    if (historyIndex === -1) {
      return res
        .status(404)
        .json({ message: "Medical history not found", success: false });
    }

    patient.medicalHistory.splice(historyIndex, 1);

    await patient.save();

    return res
      .status(200)
      .json({ message: "Medical history removed successfully", success: true });
  } catch (error) {
    console.error("Error removing medical history", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const viewSubscribedHealthPackages = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in." });
    } else {
      id = decodedToken.name;
    }
  });
  try {
    const patient = await patientModel.findById(id).exec();

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const familyMembers = await familyMembersAcc
      .find({ patient: patient._id })
      .exec();
    const familyMembers2 = await familyMembersAcc
      .find({ Id: patient._id })
      .exec();

    const packageData = [];

    // Add patient's health package data
    packageData.push({
      patientName: patient.name,
      package: patient.package,
      status: patient.packageStatus,
      renewalDate: patient.packageRenewalDate,
    });

    // Add family members' health package data
    for (const familyMember of familyMembers) {
      const member = await userModel.findById(familyMember.Id).exec();

      packageData.push({
        patientName: member.name,
        package: member.package,
        status: member.packageStatus,
        renewalDate: member.packageRenewalDate,
      });
    }
    for (const familyMember of familyMembers2) {
      const member = await userModel.findById(familyMember.patient).exec();

      packageData.push({
        patientName: member.name,
        package: member.package,
        status: member.packageStatus,
        renewalDate: member.packageRenewalDate,
      });
    }

    res.status(200).json(packageData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const viewFamilyAppointments = async (req, res) => {
  const familyMemberData = [];
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
    const patientId = id;
    const patient = await patientModel.findById(patientId);

    const familyAppNoAcc = await appointmentModel
      .find({ patient: patientId, patientName: { $ne: patient.name } })
      .populate("doctor", "name")
      .exec();

    const familyMemberAcc = await familyMembersAcc.find({
      patient: patientId,
    });

    const familyMemberAccRev = await familyMembersAcc.find({
      Id: patientId,
    });

    if (
      familyAppNoAcc.length <= 0 &&
      familyMemberAcc.length <= 0 &&
      familyMemberAccRev.length <= 0
    ) {
      res
        .status(200)
        .send(
          "You don't have any family members added who have an appointment"
        );
    } else {
      familyMemberData.push(familyAppNoAcc);

      for (const member of familyMemberAcc) {
        const memberAppointments = await appointmentModel
          .find({
            patient: member.Id,
          })
          .populate("doctor", "name")
          .exec();
        familyMemberData.push(...memberAppointments);
      }
      for (const memberRev of familyMemberAccRev) {
        const memberRevAppointments = await appointmentModel
          .find({
            patient: memberRev.patient,
          })
          .populate("doctor", "name")
          .exec();
        familyMemberData.push(...memberRevAppointments);
      }

      res.status(200).json(familyMemberData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const viewPatientAppointments = async (req, res) => {
  const token = req.cookies.jwt;
  var id;
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in." });
    } else {
      id = decodedToken.name;
    }
  });
  const patientId = id;
  try {
    const patient = await patientModel.findById(patientId);

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const appointments = await appointmentModel
      .find({ patient: patientId, patientName: patient.name })
      .populate("doctor", "name")
      .exec();

    if (appointments.length === 0) {
      return res.status(200).send("No appointments found for this patient.");
    }

    // const formattedAppointments = appointments.map((appointment) => {
    //   return {
    //     id: appointment._id,
    //     patientName: appointment.patientName,
    //     doctorid: appointment.doctor._id,
    //     doctor: appointment.doctor.name,
    //     date: appointment.date,
    //     duration: appointment.duration,
    //     status: appointment.status,
    //   };
    // });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const checkoutSession = async (req, res) => {
  try {
    const lineItems = req.body.lineItems;
    const success_url = req.body.success_url;
    const cancel_url = req.body.cancel_url;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: success_url,
      cancel_url: cancel_url,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const cancelHealthPackageSubscription = async (req, res) => {
  const patients = req.body.patients;
  var response = "";

  try {
    // Find the patient
    const token = req.cookies.jwt;
    var id;
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        id = decodedToken.name;
      }
    });
    const patient1 = await patientModel.findById(id);
    var patient;
    if (!patient1) {
      return res.status(404).send("Patient not found");
    } else {
      patient1.packageStatus = "Cancelled With End Date";
      await patient1.save();
      response +=
        patient1.name +
        "'s health package subscription canceled successfully. \n";
    }
    for (const patientID of patients) {
      // Cancel the patient's health package subscription
      patient = await patientModel.findById(patientID);
      patient.packageStatus = "Cancelled With End Date";
      //patient.packageRenewalDate = null;
      await patient.save();
      response +=
        patient.name +
        "'s health package subscription canceled successfully. \n";
    }
    res.status(200).send(response);
    //console.log(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "An error occurred while canceling the health package subscription."
      );
    console.log(
      "An error occurred while canceling the health package subscription."
    );
  }
};

const viewAvailableAppointments = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    // Get the doctor's information, including available time slots
    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    if (doctor.availableTimeSlots == null) {
      return res.status(404).json({ error: "No available Appointments" });
    } else {
      res.status(200).send(doctor.availableTimeSlots);
    }
    //const { availableTimeSlots } = doctor;

    // Get all appointments for the doctor that are in the future
    // const futureAppointments = await appointmentModel.find({
    //   doctor: doctorId,
    //   date: { $gte: new Date() },
    // });

    // // Extract the booked time slots from future appointments
    // const bookedTimeSlots = futureAppointments.map((appointment) => ({
    //   day: appointment.day,
    //   startTime: appointment.startTime,
    //   endTime: appointment.endTime,
    // }));

    // // Calculate available time slots by subtracting booked time slots
    // const availableTimeSlotsFiltered = availableTimeSlots.filter(
    //   (availableSlot) =>
    //     !bookedTimeSlots.some(
    //       (bookedSlot) =>
    //         bookedSlot.day === availableSlot.day &&
    //         bookedSlot.startTime === availableSlot.startTime &&
    //         bookedSlot.endTime === availableSlot.endTime
    //     )
    // );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentid;
    // Find the appointment by ID
    const appointment = await appointmentModel.findById(appointmentId);
    let alertM = "";
    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "canceled";
    await appointment.save();
    const appointmentTime = appointment.date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endt = new Date(
      appointment.date.getTime() + appointment.duration * 60000
    );
    const end = endt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    await doctorModel.findOneAndUpdate(
      { _id: appointment.doctor },
      {
        $push: {
          availableTimeSlots: {
            date: appointment.date,
            startTime: appointmentTime,
            endTime: end,
          },
        },
      }
    );
    const twentyFourHoursFromNow = new Date();
    twentyFourHoursFromNow.setHours(twentyFourHoursFromNow.getHours() + 24);

    if (appointment.date >= twentyFourHoursFromNow) {
      const patient = await patientModel.findById(appointment.patient);
      const doctor = await doctorModel.findById(appointment.doctor);
      const price = await doctorPrice(appointment.patient, doctor.username);
      console.log(price + "\n" + patient.amountInWallet);
      patient.amountInWallet += price;
      await patient.save();
      console.log(patient.amountInWallet);
      alertM =
        "A total of " +
        price.toString() +
        "EGP was refunded to the patient's wallet";
    }
    alertM = "Appointment canceled successfully \n" + alertM;
    return res.json({ message: alertM, appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewPrescriptionDetails = async (req, res) => {
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

    const patientId = id;
    const prescriptionId = req.params.prescriptionId;
    const prescription = await PrescriptionsModel.findById(prescriptionId);

    console.log(patientId);

    if (!prescription) {
      return res.status(404).send("Prescription not found");
    }

    res.status(200).send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//needs debugging, postman not working
const getAllPrescriptionsForPatient = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let patientId;

    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
      } else {
        patientId = decodedToken.name;
      }
    });

    const prescriptions = await PrescriptionsModel.find({ patient: patientId })
      .populate("doctor", "name") // Assuming doctor ID is stored in prescriptions and is populated
      .populate("medicine.medID", "Name"); // Assuming medicine ID is stored in prescriptions and is populated

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this patient." });
    }

    const prescriptionsWithStatus = prescriptions.map((prescription) => {
      const filledStatus = prescription.medicine.map((med) => {
        return {
          name: med.medID.Name,
          dosage: med.dosage,
          duration: med.duration,
          filled: med.medID.quantity > 0 ? "filled" : "unfilled",
        };
      });

      return {
        doctor: prescription.doctor.name,
        prescriptions: filledStatus,
      };
    });

    res.status(200).json({
      status: "success",
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

module.exports = {
  addFamilyMember,
  viewFamilyMembers,
  viewDoctors,
  filterAppointmentsByDateAndStatus,
  searchByNameSpec,
  test,
  getPatients,
  viewDocInfo,
  viewPrescriptions,
  searchBySpecDate,
  getPatient,
  filterprescriptionsbydatestatusdoctor,
  addFamilyMemberByUsername,
  getAmountInWallet,
  subscribeToAHealthPackage,
  withdrawFromWallet,
  appointmentsForDoc,
  BookAnAppointment,
  getAllSpecialities,
  uploadMedicalHistory,
  viewSubscribedHealthPackages,
  checkoutSession,
  viewPatientAppointments,
  cancelHealthPackageSubscription,
  viewAvailableAppointments,
  viewMedicalHistory,
  removeMedicalHistory,
  properDateAndTime,
  requestFollowUp,
  viewFamilyAppointments,
  cancelAppointment,
  viewPrescriptionDetails,
  getAllPrescriptionsForPatient,
};
