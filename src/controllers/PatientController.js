const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")
const { error } = require("console")



const addFamilyMember = async(req, res) => {
    const member = new familyMemberModel({
        name : req.body.name,
        nationalID : req.body.nationalID,
        age : req.body.age,
        gender : req.body.gender,
        relation : req.body.relationToPatient,
        patient : req.body.patient
    })
    familyMemberModel.findOne({Patient: member.Patient}, (error, result) => {
        if(error){
            console.error('Error finding document:', error);
        }
        else{
            familyMemberModel.findOne({Name: member.name}, (error, result2) => {
                if(error){
                    console.error('Error finding document:', error);
                }
                else{
                    if(result2){
                        console.log('Family member already exists')
                        return
                    }
                    else{
                        member.save().catch(err => console.log(err))
                        console.log("request sent")
                        res.status(200).send('Family member added')
                    }
                }
            })
        }
    })

}

const viewFamilyMembers = async(req, res) => {
    // const neededPatient = req.body.patient
    // const members = await familyMemberModel.find({Patient: neededPatient})
    // console.log(members)
    // res.status(200).send(members)
}

const viewDoctors = async(req, res) => {
    
}

const searchDoctors = async(req, res) => {

}

