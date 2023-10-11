const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientModel = require('./Patient.js');
const doctorModel = require('./Doctor.js');
// const userModel = require('./user.js')

const appointmentsSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        autoRemove: true,
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
      
     status:{
         type: String, 
        enum:["done", "canceled", "currently working", "pending"]
    }
})

const appointments= mongoose.model("appointments", appointmentsSchema);
module.exports = appointments;
