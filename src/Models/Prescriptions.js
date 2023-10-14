const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    autoRemove: true,
  },
  medicine: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'medicine',
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
  },
  date: {
    type: Date,
    required: true,
  }
});

const prescription = mongoose.model("prescription", prescriptionSchema);
module.exports = prescription;
