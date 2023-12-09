const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientModel = require('./Patient.js');
const doctorModel = require('./Doctor.js');
// const userModel = require('./user.js')

const FollowUpSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        autoRemove: true,
      },
      patientName: {
        type: String,
        
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        autoRemove: true,
      },
      date: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number,
        default: 30,
      },
      pastAppointement:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        autoRemove: true,
      },
     approvalStatus:{
         type: String, 
        enum:["accepted", "pending", "rejected"],
        default: "pending"
    }
})

const followUps= mongoose.model("followUps", FollowUpSchema);
module.exports = followUps;