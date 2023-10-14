 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const doctorSchema = require('./Doctor')
 const patientSchema = require('./Patient')
 //const medicineSchema = require('./../55-Es3af-Pharmacy/backend/src/Models/Medicine.js');

 const prescriptionSchema = new Schema ({
     patient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        autoRemove: true,
   },
     medicine : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'medicine'
   },
     doctor : {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'doctor',
       autoRemove: true,
   },
     status : {
        enum : ["filled", "unfilled"],
        required : true
     },
       date : {
         type: Date,
         required : true


    }
})
// //prescriptionSchema.pre('save',function(next){
//   //  if (this.isModified('status')&& this.status == 'filled'){
//     //    this.date = new Date();
//     //}
//     //next();
// //});
 const prescription = mongoose.model("prescription", prescriptionSchema)
 module.exports = prescription