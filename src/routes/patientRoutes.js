const Router = require('express')
const patientController = require('../controllers/PatientController')


const patientRoutes = new Router();

patientRoutes.get('/:id/getAmountInWallet', patientController.getAmountInWallet)
patientRoutes.post("/createSession",patientController.checkoutSession)
patientRoutes.put('/:id/updatePassword', patientController.changePassword)
patientRoutes.get("/searchBySpecDate", patientController.searchBySpecDate)
patientRoutes.put('/widrawFromWallet',patientController.withdrawFromWallet)
patientRoutes.post('/:id/addFamilyMemberByAcc',patientController.addFamilyMemberByUsername)
patientRoutes.get('/:id/updatePassword', patientController.getPassword)
patientRoutes.get('/search', patientController.searchByNameSpec)
patientRoutes.get('/familyMembers', patientController.viewFamilyMembers)
patientRoutes.get('/viewDoctors',patientController.viewDoctors)
patientRoutes.get('/:id', patientController.getPatient)
patientRoutes.post('/addFamilyMember', patientController.addFamilyMember)
patientRoutes.get('/doctorInfo/:id',patientController.viewDocInfo);
patientRoutes.get("/viewPrescriptions/:id",patientController.viewPrescriptions)
patientRoutes.get("/filterPrescriptions/:id", patientController.filterprescriptionsbydatestatusdoctor)
patientRoutes.put('/subscribeToAHealthPackage', patientController.subscribeToAHealthPackage)
patientRoutes.get("/filterprescriptionsbydatestatusdoctor/:id", patientController.filterprescriptionsbydatestatusdoctor)
patientRoutes.get("/filterAppointmentsByDateAndStatus/:id", patientController.filterAppointmentsByDateAndStatus)

//patientRoutes.get('/', patientController.getAllSpecialities)
patientRoutes.get('/viewPatientAppointments/:id', patientController.viewPatientAppointments);
patientRoutes.post('/uploadMedicalHistory', patientController.uploadMedicalHistory);
patientRoutes.post("/BookAnAppointment/:id", patientController.BookAnAppointment);
patientRoutes.get('/viewSubscribedHealthPackages/:username', patientController.viewSubscribedHealthPackages);
patientRoutes.put('/cancelHealthPackageSubscription/:id', patientController.cancelHealthPackageSubscription); 

module.exports = {patientRoutes}