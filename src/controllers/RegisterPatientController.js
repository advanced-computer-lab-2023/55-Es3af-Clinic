const userModel = require('../Models/user.js');
const patientModel = require('../Models/Patient.js')
const { default: mongoose } = require('mongoose');

const registerPatient = async(req,res) => {
    userModel.findOne({username: req.body.username})
    .exec()
    .then((result) => {
        if(result=== null){
            userModel.findOne({email: req.body.email})
            .exec()
            .then((result2)=>{
                if(result2 === null){
                    // const newUser= new userModel({
                    //     username: req.body.username,
                    //     name: req.body.name,
                    //     email: req.body.email,
                    //     password: req.body.password,
                    //     dateOfBirth: req.body.dateOfBirth,
                    //     type:req.body.type,
                    //    });
                    //    console.log(`new user is ${newUser}`)
                    //    newUser.save().catch(err => console.log(err));
                       
                    //    var user = {}
                    // //    var userID
                    //    userModel.findOne({username: req.body.username})
                    //        .exec()
                    //        .then((result) => {
                    //         user = result
                    //         // const {_id} = userModel.findOne({username: req.body.username})
                    //         // console.log(`user is ${result} and id is ${_id}`)
                    //        })
                    //        .catch((err) => {console.error(err)})
                       const newPatient= new patientModel({
                           username: req.body.username,
                           name: req.body.name,
                           email: req.body.email,
                           password: req.body.password,
                           dateOfBirth: req.body.dateOfBirth,
                           type:req.body.type,
                           gender:req.body.gender,
                           mobile:req.body.mobile,
                           emergencyContact:req.body.emergencyContact
                       });
                       console.log(`new patient is ${newPatient}`)
                       newPatient.save().catch(err => console.log(err));
                       res.status(200).send("Created");
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