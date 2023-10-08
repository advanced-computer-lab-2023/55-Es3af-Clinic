const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientSchema = require('./Patient')

const familyMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nationalID: {
    type: String,
    required: true,
  },
  age: {
    type : Number,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    autoRemove: true,
  },
  relationToPatient : {
    type: String,
    enum: ["Wife/Husband", "Child"]
  }
});

const familyMembers = mongoose.model("familyMembers", familyMemberSchema);
module.exports = familyMembers;
