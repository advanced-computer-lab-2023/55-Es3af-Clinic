const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require('./user')

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
    ref: 'user',
    autoRemove: true,
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

const doctor = mongoose.model("doctor", doctorSchema);
// const Doctor= userModel.discrimination('Doctor', doctorSchema);
module.exports = doctor;
