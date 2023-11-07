const userModel = require("../Models/user.js");
const Doctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");
const DoctorRequest = require("../Models/RequestDoctor");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.send(await userModel.create({ username, password, type: "admin" }));
  } catch (e) {
    res.status(400).send(e);
  }
};

const listUsers = async (req, res) => {
  try {
    res.send(await userModel.find());
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

const getPassword = async (req, res) => {
  const userID = req.params.id;
  var user = await userModel.findById(userID);
  res.status(200).send(user.password);
};
const changePassword = async (req, res) => {
  const userID = req.params.id;
  var newPassword = req.body.password;
  try {
    await userModel.findByIdAndUpdate(userID, { password: newPassword });
    res.status(200).send("Password updated successfully");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addAdmin,
  deleteUser,
  listUsers,
  viewDoctorData,
  changePassword,
  getPassword,
};
