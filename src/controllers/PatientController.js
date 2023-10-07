const patientModel = require("../Models/Patient.js")
const familyMemberModel = require("../Models/FamilyMembers.js")

const addFamilyMember = async(req, res) => {
    var name = req.body.name
    var nationalID = req.body.nationalID
    var age = req.body.age
    var relation = req.body.relationToPatient

    

}