const mongoose = require("mongoose");
const { Schema } = mongoose;

const packageSchema = new Schema({
    type: {
        type: String,
        enum: ["Silver", "Gold", "Platinum"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sessionDiscount: {
        type: Number,
        required: true,
    },
    medicationDiscount: {
        type: Number,
        required: true,
    },
    familyMemberDiscount: {
        type: Number,
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
    },
    familyMember: {
        type: Schema.Types.ObjectId,
        ref: "FamilyMember",
    },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
