const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./user.js')

const patientSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   autoRemove: true,
  // },
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
  }
});

//const patient = mongoose.model("patient", patientSchema);
const patient= userModel.discrimination('patient', patientSchema);
module.exports = patient;
