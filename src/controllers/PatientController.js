const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")
const userModel = require('../Models/user.js')
const packageModel = require('../Models/Packages.js')
const { error } = require("console")
const { default: mongoose } = require('mongoose');
const { disconnect } = require("process")

const test = async(req, res) => {
    const newDoc = new doctorModel({
        username: 'doc1',
        name: 'doc1',
        email: 'doc1@email.com',
        password: 'doc1',
        dateOfBirth: '2002-11-11',
        type: 'doctor',
        hourlyRate: 4,
        affiliation: 'hospital',
        educationBackground: 'uni',
        speciality: 'surgery'
    })
    newDoc.save().catch(err => console.error(err))
    res.status(200).send(newDoc)
}

const addFamilyMember = async(req, res) => {

    console.log(req.body)

    const member = new familyMemberModel({
        name : req.body.name,
        nationalID : req.body.nationalID,
        age : req.body.age,
        gender : req.body.gender,
        relationToPatient : req.body.relationToPatient,
        patient : req.body.patient //will be the username since it's unique
    })

    console.log(`family member is ${member}`)
    //var patient = member.patient
    //console.log(`patient is ${patient}`)

    familyMemberModel.find({patient: patient})
        .exec()
        .then((document) => {
            console.log(`family members are ${document}`)
            familyMemberModel.findOne({name: member.name})
                .exec()
                .then((document2) => {
                    if(document2){
                        console.log('Family member already exists')
                        res.status(200).send('Family member already exists')
                        return
                    }
                    else{
                        member.save().catch(err => console.log(err))
                        console.log("request sent")
                        res.status(200).send('Family member added')
                    }
                })
                .catch((err) => {console.error(err)})

        .catch((err) => {console.error(err)})
        })
}

const viewFamilyMembers = async(req, res) => {
    const neededPatient = req.body.patient
    console.log(`Patient is ${neededPatient}`)
    familyMemberModel.find({patient: neededPatient})
        .exec()
        .then((result) => {
            if(Object.keys(result).length === 0){
                res.status(200).send("You don't have any family members added")
            }
            else{
                res.status(200).send(result)
            }
        })
        .catch((err) => {console.error(err)})


    // try{
    //     const user = await user.findOne({ username }).populate('patient');
    
    //     if (user && user.patient) {
    //       const familyMembers = user.patient.family_members;
    //       return familyMembers;
    //     } else {
    //       throw new Error('Patient not found');
    //     }
    //   } catch (error) {
    //     throw new Error(`Error viewing family members: ${error.message}`);
    //   }
}

const viewDoctors = async(req, res) => {
    doctorModel.find({})
        .exec()
        .then((docResult) => {
            if(Object.keys(docResult).length === 0) {
                res.status(200).send('There is no doctors')
            }
            else{
                var patient = req.body.patient
                var discount = 0
                patientModel.findById(patient)
                    .exec()
                    .then((patientResult) => {
                        console.log(`patient is ${patientResult}`)
                        if(patientResult.package !== 'none'){
                            packageModel.findById(patientResult.package)
                                .exec()
                                .then((packageResult) => {discount = packageResult.sessionDiscount})
                                .catch((err) => {console.error(err)})
                        }
                    })
                    .catch((err) => {console.error(err)})
                console.log(docResult)
                var docPrice = (docResult.hourlyRate * 1.1) - discount
                userModel.findById(docResult.user)
                    .exec()
                    .then((docUserResult) => {
                        console.log(`user is ${docUserResult}`)
                        var docInfo = {
                            name: docUserResult.name,
                            speciality: docResult.speciality,
                            price : docPrice
                        }
                        res.status(200).send(docInfo)
                    })
                    .catch((err) => {console.error(err)})
                res.status(200).send(docResult)
            }
        })
        .catch((err) => {console.error(err)})
}

const searchDoctorsByName = async(req, res) => {
    var docName = req.body.name
    doctorModel.find({name: docName})
        .exec()
        .then((result) => {
            if(Object.keys(result).length === 0){
                res.status(200).send(`There is no results for ${docName}`)
            }
            else {res.status(200).send(result)}
        })
        .catch((err) => {console.error(err)})
}

const searchDoctorsBySpeciality = async(req, res) =>{
    var docSpec = req.body.speciality
    doctorModel.find({speciality : docSpec})
        .exec()
        .then((result) => {
            if(Object.keys(result).length === 0){
                res.status(200).send(`There is no results for ${docSpec}`)
            }
            else {res.status(200).send(result)}
        })
        .catch((err) => {console.error(err)})
}

const searchByNameSpec = async(req, res) => {

}

const searchBySpecDate = async(req, res) => {

}

const viewDocInfo = async(req, res) => {

}

const viewPrescriptions = async(req, res) => {

}


module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctorsByName, searchDoctorsBySpeciality,searchByNameSpec, test}

