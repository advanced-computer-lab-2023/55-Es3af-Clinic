const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')
const packageModel = require('./Packages.js')


const patientSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   autoRemove: true,
  // },
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
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  emergencyContactName: {
    type: String,
    required: true,
  },
  emergencyContactMobile: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    ref: 'package',
    default: 'none'
  },
  packageStatus:{
    type:String,
    enum:["Subscribed With Renewal Date", "Unsubscribed","Cancelled With End Date"],
    default:"Unsubscribed"
  },
  packageRenewalDate:{
    type: Date,
    default: null
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor', 
    default: null
  },
  amountInWallet:{
    type:Number,
    default:0,
  },
  medicalHistory: [{
    name: String,
    data: Buffer,
    contentType: String
  }]
  
  // healthRecords: [{ type: Schema.Types.ObjectId, ref: 'HealthRecord' }]
});

//const patient = mongoose.model("patient", patientSchema);
const patient= userModel.discriminator('patient', patientSchema);
module.exports = patient;
