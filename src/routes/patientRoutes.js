const Router = require('express')
const patientController = require('../controllers/PatientController')
const userController = require('../controllers/UserController')


const patientRoutes = new Router();
patientRoutes.get('/viewAvailableAppoinments', patientController.viewAvailableAppointments);

patientRoutes.get('/getAmountInWallet', patientController.getAmountInWallet)
patientRoutes.post("/createSession",patientController.checkoutSession)
patientRoutes.put('/updatePassword', userController.changePassword)
patientRoutes.get("/searchBySpecDate", patientController.searchBySpecDate)
patientRoutes.put('/withdrawFromWallet',patientController.withdrawFromWallet)
patientRoutes.post('/:id/addFamilyMemberByAcc',patientController.addFamilyMemberByUsername)
patientRoutes.get('/search', patientController.searchByNameSpec)
patientRoutes.get('/familyMembers', patientController.viewFamilyMembers)
patientRoutes.get('/viewDoctors',patientController.viewDoctors)
patientRoutes.get('/getPatient', patientController.getPatient)
patientRoutes.post('/addFamilyMember', patientController.addFamilyMember)
patientRoutes.get('/doctorInfo/:id',patientController.viewDocInfo);
patientRoutes.get("/viewPrescriptions/:id",patientController.viewPrescriptions)
patientRoutes.get("/filterPrescriptions/:id", patientController.filterprescriptionsbydatestatusdoctor)
patientRoutes.put('/subscribeToAHealthPackage', patientController.subscribeToAHealthPackage)
patientRoutes.get("/filterprescriptionsbydatestatusdoctor/:id", patientController.filterprescriptionsbydatestatusdoctor)
patientRoutes.get("/filterAppointmentsByDateAndStatus/:id", patientController.filterAppointmentsByDateAndStatus)
//patientRoutes.get("/viewAvailableAppoinments/:id", patientController.viewAvailableAppointments);
//patientRoutes.get('/', patientController.getAllSpecialities)
patientRoutes.get('/viewPatientAppointments', patientController.viewPatientAppointments);
patientRoutes.post('/uploadMedicalHistory', patientController.uploadMedicalHistory);
patientRoutes.post("/BookAnAppointment/:id", patientController.BookAnAppointment);
patientRoutes.get('/viewSubscribedHealthPackages/:username', patientController.viewSubscribedHealthPackages);
patientRoutes.put('/cancelHealthPackageSubscription/:id', patientController.cancelHealthPackageSubscription);

module.exports = {patientRoutes}