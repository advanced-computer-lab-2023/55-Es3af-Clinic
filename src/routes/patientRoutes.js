const Router = require('express')
const patientController = require('../controllers/PatientController')

const patientRoutes = new Router();

patientRoutes.get('/viewDoctors',patientController.viewDoctors)
patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.get('/familyMembers', patientController.viewFamilyMembers)
patientRoutes.post('/addFamilyMember', patientController.addFamilyMember)
patientRoutes.get("/doctorInfo/:id",patientController.viewDocInfo);




module.exports = {patientRoutes}