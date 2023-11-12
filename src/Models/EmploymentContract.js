const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employmentContractSchema = new Schema ({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        autoRemove: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    markup: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum : ["Active", "Pending", "Terminated"],
        requried: true
    },
    startDate: {
        type: Date,
        required: true
    },
    terminationDate: {
        type: Date,
        required: true
    }
})

const EmploymentContract = mongoose.model("contract", employmentContractSchema);
module.exports = EmploymentContract;