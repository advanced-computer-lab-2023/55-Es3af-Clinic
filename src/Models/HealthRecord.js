const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patient = require("./Patient");

const healthRecordSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        autoRemove: true,
      },
  description: {
    type: Array,
    required: true
  },
  // Add other relevant health record fields here
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord;


