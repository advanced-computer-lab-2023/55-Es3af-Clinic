const userModel = require("../Models/user.js");
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");
const DoctorRequest = require("../Models/RequestDoctor");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    // const token = req.cookies.jwt;
  //   var id;
  //   jwt.verify(token, 'supersecret', (err ,decodedToken) => {
  //     if (err) {
  //       res.status(401).json({message: "You are not logged in."})
  //     }
  //     else {
  //       id = decodedToken.name;
  //     }
  //   });
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    res.send(await userModel.create({ username,password:hashedPassword, type: "admin" }));
  } catch (e) {
    
    res.status(400).send(e);
  }
};

const listUsers = async (req, res) => {
  try {
    // const token = req.cookies.jwt;
  //   var id;
  //   jwt.verify(token, 'supersecret', (err ,decodedToken) => {
  //     if (err) {
  //       res.status(401).json({message: "You are not logged in."})
  //     }
  //     else {
  //       id = decodedToken.name;
  //     }
  //   });
    const users = await userModel.find().lean(); // Use lean() to get plain JavaScript objects instead of Mongoose Documents
    const cleanedUsers = users.map(user => ({
      ...user,
      _id: user._id.toString().trim(), // Convert ObjectId to string and remove whitespace
    }));

    res.send(cleanedUsers);
  } catch (e) {
    res.status(400).send(e);
  }
};


const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (e) {
    res.status(400).json({ status: fail, message: e });
  }
};

const viewDoctorData = async (req, res) => {
  try {
    const doctorsData = await DoctorRequest.find({});
    res.send(doctorsData);
  } catch (e) {
    res.status(400).send(e);
  }
};

// const getPassword = async (req, res) => {
  
//   const userID = req.params.id;
//   var user = await userModel.findById(userID);
//   res.status(200).send(user.password);
// };

// const changePassword = async (req, res) => {
//   const userID = req.params.id;
//   var newPassword = req.body.password;
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   try {
//     await userModel.findByIdAndUpdate(userID, { password: hashedPassword });
//     res.status(200).send("Password updated successfully");
//   } catch (err) {
//     console.error(err);
//   }
// };


const acceptDoctorRequest = async (req, res) => {
  try {
    const doctorRequestId = req.params.id;
    const doctorRequest = await DoctorRequest.findById(doctorRequestId);

    if (!doctorRequest) {
      return res.status(404).json({ message: 'Doctor request not found' });
    }
    

    const newDoctor = new Doctor({
      username: doctorRequest.username,
      password: doctorRequest.password,
      name: doctorRequest.name,
      email: doctorRequest.email,
      dateOfBirth: doctorRequest.dateOfBirth,
      hourlyRate: doctorRequest.hourlyRate,
      affiliation: doctorRequest.affiliation,
      educationBackground: doctorRequest.educationBackground,
      speciality: doctorRequest.speciality,
    });

    await newDoctor.save();
    await DoctorRequest.findByIdAndDelete(doctorRequestId);

    res.status(200).json({ status: 'success', message: 'Doctor request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
const rejectDoctorRequest = async (req, res) => {
  try {
    const doctorRequestId = req.params.id;
    await DoctorRequest.findByIdAndDelete(doctorRequestId);

    res.status(200).json({ status: 'success', message: 'Doctor request rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};


module.exports = {
  addAdmin,
  deleteUser,
  listUsers,
  viewDoctorData,
  acceptDoctorRequest,
  rejectDoctorRequest,
};
