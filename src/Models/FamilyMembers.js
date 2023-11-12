const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Patient = require('./Patient');  

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
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  
    // autoRemove: true,  
  },
  relationToPatient: {
    type: String,
    enum: ["Wife", "Child", "Husband", "Wife/Husband"]
  }
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);
module.exports = FamilyMember;  
