const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')

const doctorSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   autoRemove: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
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
    default:"General",
  },
  amountInWallet:{
    type:Number,
    default:0,
  },
  IDdoc: {
    name: String,
    data: Buffer,
    contentType: String
  },
  MedicalLicenses: [{
    name: String,
    data: Buffer,
    contentType: String
  }],
  MedicalDegree: {
    name: String,
    data: Buffer,
    contentType: String
  },
  availableTimeSlots: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    }
  ]
  
});

//const doctor = mongoose.model("doctor", doctorSchema);
const doctor= userModel.discriminator('doctor', doctorSchema);
module.exports = doctor;
