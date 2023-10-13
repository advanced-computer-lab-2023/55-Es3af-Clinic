const user = require('../Models/user.js');
const Doctor = require('../Models/Doctor.js');
const { default: mongoose } = require("mongoose");



const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.send(await user.create({ username, password, type: 'admin' }));
  } catch (e) {
    res.status(400).send(e);
  }
};

const listUsers = async (req, res) => {
  try {
    res.send(await user.find());
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.send(await user.findByIdAndDelete(req.params.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const viewDoctorData = async (req, res) => {
  try {
    const doctorsData = await Doctor.find({}, 'hourlyRate affiliation educationBackground speciality');
    res.send(doctorsData);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { addAdmin, deleteUser, listUsers, viewDoctorData };
