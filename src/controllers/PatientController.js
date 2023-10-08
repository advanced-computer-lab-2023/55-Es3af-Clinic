const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")
const doctorModel = require("../Models/Doctor.js")


const addFamilyMember = async(req, res) => {
    var name = req.body.name
    var nationalID = req.body.nationalID
    var age = req.body.age
    var relation = req.body.relationToPatient

    

}

const viewFamilyMembers = async(req, res) => {
    try{
        const user = await user.findOne({ username }).populate('patient');
    
        if (user && user.patient) {
          const familyMembers = user.patient.family_members;
          return familyMembers;
        } else {
          throw new Error('Patient not found');
        }
      } catch (error) {
        throw new Error(`Error viewing family members: ${error.message}`);
      }
}

const viewDoctors = async(req, res) => {

}

const searchDoctors = async(req, res) => {

}

