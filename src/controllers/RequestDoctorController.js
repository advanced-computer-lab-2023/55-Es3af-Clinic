const userModel = require('../Models/RequestDoctor.js');
const {default: mongoose} = require('mongoose');
const doctorReqModel = require('../Models/RequestDoctor.js');


const requestDoctor = async(req,res) => {
    try{
        const newDoctor = new doctorReqModel({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            hourlyRate: req.body.hourlyRate,
            affiliation: req.body.affiliation,
            educationBackground: req.body.educationBackground,
            speciality: req.body.speciality
        });
        newDoctor.save().catch(err => console.log(err));
        res.status(200).send("Request sent.");
    }
    catch(error){
        requestDoctor.status(400).send({error:error});
    }
 }

 const getDocReq = async (req, res) => {
    //retrieve all Doctor requests from the database
    const doctorReq= await doctorReqModel.find({});
    console.log(doctorReq);
    res.status(200).send(doctorReq);
   }

module.exports = {requestDoctor, getDocReq};


   // const requestDoctor = async(req,res) => {
//     userModel.findOne({username: req.body.username})
//     .exec()
//     .then((result) => {
//         if(Object.keys(result).length === 0){
//             userModel.findOne({email: req.body.email})
//             .exec()
//             .then((result2)=>{
//                 if(Object.keys(result2).length === 0){
//                     const newUser= new userModel({
//                         username: req.body.username,
//                         name: req.body.name,
//                         email: req.body.email,
//                         password: req.body.password,
//                         dateOfBirth: req.body.dateOfBirth,
//                         type:req.body.type,
//                        });
//                        newUser.save().catch(err => console.log(err));
//                        userModel.findOne({username: req.body.username})
//                            .exec()
//                            .then((result))
//                            .catch((err) => {console.error(err)})
//                        const newDoctor= new doctorModel({
//                            user: result._id,
//                            hourlyRate: req.body.hourlyRate,
//                            affiliation: req.body.affiliation,
//                            educationBackground: req.body.educationBackground,
//                            speciality: req.body.speciality
//                        });
//                        newDoctor.save().catch(err => console.log(err));
//                        res.status(200).send("Request sent.");
//                 }
//                 else{
//                     res.status(200).send("Email already exists.");
//                     return;
//                 }
//             })
//             .catch((err) => {console.error(err)})
//         }
//         else{
//             res.status(200).send("Username already exists.");
//             return;
//         }
//     })
//     .catch((err) => {console.error(err)})
    
//  }

// module.exports = {requestDoctor};