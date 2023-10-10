const userModel = require('../Models/RequestDoctor.js');
const doctorModel = require('../Models/Doctor.js')
const { default: mongoose } = require('mongoose');

const requestDoctor = async(req,res) => {
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
    const newDoctor= new doctorModel({
        user : result._id,
        hourlyRate: req.body.hourlyRate,
        affiliation: req.body.affiliation,
        educationBackground: req.body.educationBackground,
        speciality: req.body.speciality,
    });
    newDoctor.save().catch(err => console.log(err));
    res.status(200).send("Request sent.");
 }

module.exports = {requestDoctor};