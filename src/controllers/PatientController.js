const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")
const { error } = require("console")
const { default: mongoose } = require('mongoose');

const test = async(req, res) => {
    res.status(200).send('test')
}

const addFamilyMember = async(req, res) => {

    console.log(req.body)

    const member = new familyMemberModel({
        name : req.body.name,
        nationalID : req.body.nationalID,
        age : req.body.age,
        gender : req.body.gender,
        relationToPatient : req.body.relationToPatient,
        patient : req.body.patient
    })

    console.log(`family member is ${member}`)
    var patient = member.patient
    console.log(`patient is ${patient}`)

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
    const members = await familyMemberModel.find({patient: neededPatient})
    console.log(members)
    res.status(200).send(members)
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
    const doctors = await doctorModel.find({})
    console.log(doctors)
    res.status(200).send(doctors)
}

const searchDoctors = async(req, res) => {

}

module.exports = {addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctors, test}

