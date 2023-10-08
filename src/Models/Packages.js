const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    type : {
        type : String,
        enum : ["Silver", "Gold", "Platinum"],
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    sessionDiscount : {
        type: Number,
        required : true
    },
    medicationDiscount : {
        type : Number,
        required : true
    },
    familyMemberDiscount : {
        type : Number,
        required : true
    }

});

const package = mongoose.model("package", packageSchema);
module.exports = package;