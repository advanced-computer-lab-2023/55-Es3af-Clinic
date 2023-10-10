const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require('./user')

const patientSchema = new Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
    },
    mobile: {
      type: String,
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    autoRemove: true,
  },
  package: {
    type: String,
    ref: 'package',
    default : 'none'
  }
});

const patient = mongoose.model("patient", patientSchema);
// const Patient= userModel.discrimination('Patient', patientSchema);
module.exports = patient;
