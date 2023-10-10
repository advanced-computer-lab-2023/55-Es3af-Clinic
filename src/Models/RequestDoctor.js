const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')

const doctorReqSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
    dateOfBirth: {
    type: Date,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationBackground: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum : ["Pending", "Rejected"],
    default: "Pending"
  }
});

const docReq = mongoose.model("docReq", doctorReqSchema);
module.exports = docReq;
