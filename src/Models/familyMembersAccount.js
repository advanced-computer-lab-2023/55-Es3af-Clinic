const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const familyMemberAccSchema = new Schema({
    Id:{
        type: String,
        required:true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    },
    relationToPatient : {
        type: String,
        enum: ["Wife", "Child","Husband","Wife/Husband"]
    },

   
});
const FamilyMembers = mongoose.model("familyMembersAccount", familyMemberAccSchema);
module.exports = FamilyMembers;