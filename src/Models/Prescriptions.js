const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    autoRemove: true,
  },
  medicine: [{
    medID: {type: mongoose.Schema.Types.ObjectId, ref: 'medicine'},
    dosage: String, //7abayten ba3d el akl, etc
    duration: String //1 day, 1 month, etc
  }],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    autoRemove: true,
  },
  status: {
    type: String,
    enum: ["filled", "unfilled"],
    required: true,
    default: "unfilled"
  },
  // date: {
  //   type: Date,
  //   required: true,
  // }
});

const prescription = mongoose.model("prescription", prescriptionSchema);
module.exports = prescription;
