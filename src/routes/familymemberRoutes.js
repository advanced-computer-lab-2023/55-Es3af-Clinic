const { Router } = require("express");
const patientController = require("../controllers/PatientController");

const familyMemberRoute = new Router();

familyMemberRoute.get('/', patientController.viewFamilyMembers)
familyMemberRoute.post('/add', patientController.addFamilyMember)

module.exports = {familyMemberRoute}