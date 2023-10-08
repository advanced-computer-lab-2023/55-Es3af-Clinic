const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autoRemove: true,
  },
  speciality: {
    type: String,
    required: true
  }
});

const doctor = mongoose.model("doctor", doctorSchema);
module.exports = doctor;
