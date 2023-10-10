const userModel = require('../Models/Patient.js');
const patientModel = require('../Models/Patient.js')
const { default: mongoose } = require('mongoose');

const registerPatient = async(req,res) => {
    //add a new patient to the database with 
    //Username, Name, Email, Password, DateOfBirth, Type
    const newUser= new userModel({
     username: req.body.username,
     name: req.body.name,
     email: req.body.email,
     password: req.body.password,
     dateOfBirth: req.body.dateOfBirth,
     type:req.body.type,
    });
    newUser.save().catch(err => console.log(err));
    userModel.findOne({Username: req.body.Username})
        .exec()
        .then((result))
        .catch((err) => {console.error(err)})
    const newPatient= new patientModel({
        user : result._id,
        gender:req.body.gender,
        mobile:req.body.mobile,
        emergencyContact:req.body.emergencyContact
    });
    newPatient.save().catch(err => console.log(err));
    res.status(200).send("created");
 }

module.exports = {registerPatient};