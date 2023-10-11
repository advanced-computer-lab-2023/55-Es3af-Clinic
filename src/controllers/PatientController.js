const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")
const userModel = require('../Models/user.js')
const packageModel = require('../Models/Packages.js')
const { error } = require("console")
const { default: mongoose } = require('mongoose');
const { disconnect } = require("process")

const test = async(req, res) => {
    // const newDoc = new doctorModel({
    //     // username: 'doc2',
    //     // name: 'doc2',
    //     // email: 'doc2@email.com',
    //     // password: 'doc2',
    //     // dateOfBirth: '2002-11-11',
    //     // type: 'doctor',
    //     // hourlyRate: 5,
    //     // affiliation: 'hospital',
    //     // educationBackground: 'uni',
    //     // speciality: 'surgery'

    //     username: 'doc2',
    //     password: 'fsfs',
    //     name: 'doc2',
    //     email: 'doc2@email.com',
    //     dateOfBirth: '2000-11-12',
    //     hourlyRate: 5,
    //     affiliation: 'place',
    //     educationBackground: 'college',
    //     speciality: 'surgery'
    // })
    // newDoc.save().catch(err => console.error(err))
    // res.status(200).send(newDoc)

    const package = new packageModel({
        type: 'Gold',
        price: 6000,
        sessionDiscount: 0.6,
        medicationDiscount: 0.3,
        familyMemberDiscount: 0.15
    })
    package.save().catch(err => console.error(err))
    console.log(package)
    res.status(200).send(package)
}

const addFamilyMember = async(req, res) => {

    console.log(req.body)

    const member = new familyMemberModel({
        name : req.body.name,
        nationalID : req.body.nationalID,
        age : req.body.age,
        gender : req.body.gender,
        relationToPatient : req.body.relationToPatient,
        patient : req.body.patient //id zy ma heya
    })

    console.log(`family member is ${member}`)
    //var patient = member.patient
    //console.log(`patient is ${patient}`)

    familyMemberModel.find({patient: member.patient})
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
                        console.log("Family member added")
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
    var patient = req.body.patient //username

    doctorModel.find({})
        .exec()
        .then((docResult) => {
            if(Object.keys(docResult).length === 0) {
                res.status(200).send('There is no doctors')
            }
            else{
                const docArr = []
                const docPrice = []
                docResult.forEach((result) => {
                    docArr.push(result)
                    docPrice.push(doctorPrice(patient, result.username))
                } )
                const docInfo = []
                for(let i = 0; i < docArr.length; i++){
                    let info = {
                        name: docArr[i].name,
                        speciality: docArr[i].speciality,
                        price: docPrices[i]
                    }
                docInfo.push(info)
                }

                //var discount = 0




                
                // patientModel.findOne({username : patient})
                //     .exec()
                //     .then((patientResult) => {
                //         console.log(`patient is ${patientResult}`)
                //         if(patientResult.package !== 'none'){
                //             console.log('has package')
                //             packageModel.findOne({type: patientResult.package})
                //                 .exec()
                //                 .then((packageResult) => {
                //                     console.log(`package is ${packageResult}`)
                //                     discount = packageResult.sessionDiscount

                //                     console.log(`doctor is ${docArr} and discount is ${discount} and hourly rate is ${docResult.hourlyRate}`)
                //                     const docPrices = []
                //                     docResult.forEach((result) => docPrices.push((result.hourlyRate * 1.1) * (1 - discount)))
                //                     const docInfo = []
                //                     for(let i = 0; i < docArr.length; i++){
                //                         let info = {
                //                             name: docArr[i].name,
                //                             speciality: docArr[i].speciality,
                //                             price: docPrices[i]
                //                         }
                //                         docInfo.push(info)
                //                     }
                //                     res.status(200).send(docInfo)
                //                 })
                //                 .catch((err) => {console.error(err)})
                //         }
                //         else{
                //             const docPrices = []
                //             docResult.forEach((result) => docPrices.push(result.hourlyRate * 1.1))
                //             const docInfo = []
                //             for(let i = 0; i < docArr.length; i++){
                //                 let info = {
                //                     name: docArr[i].name,
                //                     speciality: docArr[i].speciality,
                //                     price: docPrices[i]
                //                 }
                //                 docInfo.push(info)
                //             }
                //             res.status(200).send(docInfo)
                //         }
                        
                //     })
                //     .catch((err) => {console.error(err)})
                
                // var docInfo = {
                //     name: docResult.name,
                //     speciality: docResult.speciality,
                //     price : docPrice
                // }
                //res.status(200).send(docInfo)
                // userModel.findById(docResult.user)
                //     .exec()
                //     .then((docUserResult) => {
                //         console.log(`user is ${docUserResult}`)
                        
                        
                //     })
                //     .catch((err) => {console.error(err)})
                //res.status(200).send(docResult)
            }
        })
        .catch((err) => {console.error(err)})
}

function doctorPrice(patientUsername, doctorUsername){
    var discount = 0
    var sessionPrice = 0
    //var hourlyRate = 0
    doctorModel.findOne({username: doctorUsername})
        .exec()
        .then((doctor) => {
            sessionPrice = doctor.hourlyRate * 1.1
        })
        .catch((err) => {console.error(err)})

    patientModel.findOne({username: patientUsername})
        .exec()
        .then((patient) => {
            if(patientResult.package !== 'none'){
                packageModel.findOne({type: patient.package})
                .exec()
                .then((package) => {
                    discount = package.sessionDiscount
                    sessionPrice = sessionPrice * (1 - discount)
                    return sessionPrice
                })
                .catch((err) => {console.error(err)})
            }
            else{
                sessionPrice = hourlyRate * 1.1
                return sessionPrice
            }
        })
        .catch((err) => {console.error(err)})
}

const searchDoctorsByName = async(req, res) => {
    var docName = req.query.name
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
    var docSpec = req.query.speciality
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
    var docSearch = {
        name: req.query.name,
        spec: req.query.speciality
    }
    doctorModel.find({$and: [{name: docSearch.name}, {speciality: docSearch.spec}]})
        .exec()
        .then((result) => {
            if(Object.keys(result).length === 0){
                res.status(200).send(`There is no results for ${docSpec}`)
            }
            else {res.status(200).send(result)}
        })
        .catch((err) => {console.error(err)})
}

const searchBySpecDate = async(req, res) => {

}

const viewDocInfo = async(req, res) => {
    const docUsername = req.body.Dusername  //need to work on this
    const patientUsername = req.body.Pusername
    doctorModel.findOne({username: docUsername})
        .exec()
        .then((info) => {
            var price = doctorPrice(patientUsername, docUsername)

            var docInfo = {
                name: info.name,
                affiliation: info.affiliation,
                educationBackground: info.educationBackground,
                speciality: info.speciality,
                price: price
            }

            res.status(200).send(docInfo)
        })
        .catch((err) => {console.error(err)})
}

const viewPrescriptions = async(req, res) => {

        const neededPatient = req.body.patient
        console.log(`Patient is ${neededPatient}`)
        PrescriptionsModel.find({patient: neededPatient})
            .exec()
            .then((result) => {
                if(Object.keys(result).length === 0){
                    res.status(200).send("You don't have any prescriptions added")
                }
                else{
                    res.status(200).send(result)
                }
            })
            .catch((err) => {console.error(err)})

}
exports.filterprescriptionsbydatedoctorstatus = async(req, res) => {
    const {date, doctor, status} = req.query;
    try {
        let filter = {};
        if (date){
            filter.date = date;
        }
        if (status){
            filter.status = status;
        }
        if (doctor){
            filter.doctor = doctor;
        }
        const prescription = await prescription.find(filter)
        res.status(200).send(filter)
    }catch (err) {
        console.error(err);

    }

    }



const getPatients = async (req, res) => {
    //retrieve all patients from the database
    const patients= await patientModel.find({});
    console.log(patients);
    res.status(200).send(patients);
   }

//module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctors, test, getPatients}

module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctorsByName, searchDoctorsBySpeciality,searchByNameSpec, test, getPatients, viewPrescriptions, filterprescriptionsbydatedoctorstatus}