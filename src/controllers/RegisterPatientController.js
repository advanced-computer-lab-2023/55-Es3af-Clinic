const userModel = require('../Models/user.js');
const patientModel = require('../Models/Patient.js')
const { default: mongoose } = require('mongoose');
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");
 const registerPatient = async(req,res) => {
    
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newPatient = new patientModel({
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            mobile: req.body.mobile,
            emergencyContactName: req.body.emergencyContactName,
            emergencyContactMobile: req.body.emergencyContactMobile,
            package: req.body.package
        });

        newPatient.save().catch(err => console.log(err));
        const token = createToken(newPatient._id);
        const maxAge = 3 * 24 * 60 * 60;

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).send(newPatient);
        //res.status(200).send("Patient Registered.");
    }
    catch(error){
        registerPatient.status(400).send({error:error});
    }
 }

module.exports = {registerPatient};
