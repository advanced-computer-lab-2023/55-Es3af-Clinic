const userModel = require('../Models/Patient.js');
const patientModel = require('../Models/Patient.js')
const { default: mongoose } = require('mongoose');

const registerPatient = async(req,res) => {
    userModel.findOne({username: req.body.username})
    .exec()
    .then((result) => {
        if(Object.keys(result).length === 0){
            userModel.findOne({email: req.body.email})
            .exec()
            .then((result2)=>{
                if(Object.keys(result2).length === 0){
                    const newUser= new userModel({
                        username: req.body.username,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        dateOfBirth: req.body.dateOfBirth,
                        type:req.body.type,
                       });
                       newUser.save().catch(err => console.log(err));
                       userModel.findOne({username: req.body.username})
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
                else{
                    res.status(200).send("Email already exists.");
                    return;
                }
            })
            .catch((err) => {console.error(err)})
        }
        else{
            res.status(200).send("Username already exists.");
            return;
        }
    })
    .catch((err) => {console.error(err)})
    
 }

module.exports = {registerPatient};