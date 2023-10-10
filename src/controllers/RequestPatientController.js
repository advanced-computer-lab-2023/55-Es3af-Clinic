const userModel = require('../Models/Patient.js');
const { default: mongoose } = require('mongoose');

const requestPatient = async(req,res) => {
    //add a new patient to the database with 
    //Username, Name, Email, Password, DateOfBirth, Type
    const newUser= new userModel({
     Username: req.body.username,
     Name: req.body.name,
     Email: req.body.email,
     Password: req.body.password,
     DateOfBirth: req.body.dateOfBirth,
     Type:req.body.type,
     Gender:req.body.gender,
     Mobile:req.body.mobile,
     EmergencyContact:req.body.emergencyContact
    });
    newUser.save().catch(err => console.log(err));
    res.status(200).send("created");
 }

module.exports = {requestPatient};