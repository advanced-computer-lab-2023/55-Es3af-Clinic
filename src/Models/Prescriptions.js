const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema ({
    patient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        autoRemove: true,
    },
    medecin : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : ''
    },
    doctor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        autoRemove: true,
    },
    status : {
        enum : ["filled", "unfilled"],
        required : true
    }
})