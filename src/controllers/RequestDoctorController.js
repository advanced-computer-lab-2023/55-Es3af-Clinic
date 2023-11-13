const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const docReq = require('../Models/RequestDoctor.js')

const bcrypt = require("bcrypt");

const requestDoctor = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);  
        const newDoctor = new docReq({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        hourlyRate: req.body.hourlyRate,
        affiliation: req.body.affiliation,
        educationBackground: req.body.educationBackground,
        speciality: req.body.speciality,
        status: req.body.status || "Pending",
      });
  
      // Handle file uploads
      if (req.files) {
        if (req.files.IDdoc) {
          newDoctor.IDdoc = {
            name: req.files.IDdoc[0].originalname,
            data: req.files.IDdoc[0].buffer,
            contentType: req.files.IDdoc[0].mimetype,
          };
        }
  
        if (req.files.MedicalLicenses) {
          newDoctor.MedicalLicenses = req.files.MedicalLicenses.map((license) => ({
            name: license.originalname,
            data: license.buffer,
            contentType: license.mimetype,
          }));
        }
  
        if (req.files.MedicalDegree) {
          newDoctor.MedicalDegree = {
            name: req.files.MedicalDegree[0].originalname,
            data: req.files.MedicalDegree[0].buffer,
            contentType: req.files.MedicalDegree[0].mimetype,
          };
        }
      }
  
      await newDoctor.save();
      newDoctor.save().catch(err => console.log(err));
      const token = createToken(newDoctor._id);
      const maxAge = 3 * 24 * 60 * 60;

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).send(newPatient);
      res.status(200).send('Doctor registered successfully.');
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: 'Error during registration.' });
    }
  };
  
  module.exports = { requestDoctor };
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