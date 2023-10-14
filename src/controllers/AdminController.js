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
await user.findByIdAndDelete(req.params.id)
   res.status(204).json({status: 'success', data : null});
  } catch (e) {
    res.status(400).json({status: fail , message: e});
  }
};

const viewDoctorData = async (req, res) => {
  try {
    const doctorsData = await Doctor.find({}, 'hourlyRate affiliation education Background speciality');
    res.send(doctorsData);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { addAdmin, deleteUser, listUsers, viewDoctorData };
