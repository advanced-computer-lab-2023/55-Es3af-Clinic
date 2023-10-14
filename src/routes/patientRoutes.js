const Router = require('express')
const patientController = require('../controllers/PatientController')

const patientRoutes = new Router();

patientRoutes.get('/familyMembers', patientController.viewFamilyMembers)
patientRoutes.get('/viewDoctors',patientController.viewDoctors)
patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.post('/addFamilyMember', patientController.addFamilyMember)
patientRoutes.get("/doctorInfo/:id",patientController.viewDocInfo);
patientRoutes.get("/viewPrescriptions/:id",patientController.viewPrescriptions)
patientRoutes.get("/filterPrescriptions", patientController.filterprescriptionsbydatestatusdoctor)


module.exports = {patientRoutes}