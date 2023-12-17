const fs = require("fs");
const express = require("express");
const doctorController = require("../controllers/DoctorController");
const userController = require('../controllers/UserController')
// const authMiddleware = require('../middlewares/authMiddleware');


const doctorRouter = express.Router();

doctorRouter.use(express.json());

doctorRouter.post('/addPrescription/:id',doctorController.addPrescription)
doctorRouter.post("/addDoctor", doctorController.addDoctor);
doctorRouter.put('/updatePassword', userController.changePassword)
doctorRouter.route('/getAllPrescriptions').get(doctorController.getAllPrescriptions);
doctorRouter.get('/notifi', userController.getNotifications)
doctorRouter.route("/scheduleFollowUpAppointment").post(doctorController.scheduleFollowUpAppointment);
doctorRouter.route("/updateDoctor").put(doctorController.updateDoctor);
doctorRouter.route("/getPatients").get(doctorController.getAllPatients);
doctorRouter.route("/getAllDoctors").get(doctorController.getAllDoctors);
doctorRouter
  .route("/createHealthRecords")
  .post(doctorController.createHealthRecords);
doctorRouter
  .route("/createAppointment")
  .post(doctorController.createAppointment);
doctorRouter
  .route("/viewHealthRecords/:patientId")
  .get(doctorController.viewHealthRecords);
doctorRouter
  .route("/searchPatientByName")
  .get(doctorController.searchPatientByName);
doctorRouter.route("/getAllMyPatients").get(doctorController.getAllMyPatients);
doctorRouter
  .route("/filterAppointmentsByDateAndStatus")
  .get(doctorController.filterAppointmentsByDateAndStatus);
doctorRouter
  .route("/filterPatientsByUpcomingPendingAppointments")
  .get(doctorController.filterPatientsByUpcomingPendingAppointments);
doctorRouter.route("/selectPatient").patch(doctorController.selectPatient);
doctorRouter.route("/getAmountInWallet").get(doctorController.getAmountInWallet);
doctorRouter.route("/getTimeSlots").get(doctorController.getTimeSlots);
doctorRouter.route("/addTimeSlots").post(doctorController.addTimeSlots);
doctorRouter.route("/uploadHealthRec").post(doctorController.uploadPatientHealthRec);


//doctorRouter.route("/followupAppointment").post(doctorController.followupAppointment); 
doctorRouter.route('/getAppointmentsWithStatusDone').get(doctorController.getAppointmentsWithStatusDone);
// doctorRouter.route('/viewMedicalHistory').get(doctorController.viewMedicalHistory);
doctorRouter.route('/cancelAppointment').put(doctorController.cancelAppointment);
doctorRouter.put('/acceptOrRevokeFollowUp', doctorController.acceptOrRevokeFollowUp);
doctorRouter.route('/editDosage').put(doctorController.editDosage);
doctorRouter.route('/editPrescription').put(doctorController.editPrescription);


doctorRouter.route('/rescheduleAnAppointment').put(doctorController.rescheduleAnAppointment);


// router.route('/getDoctors').get(doctorController.getAllDoctors);
// router.route('/getDoctor/:id').patch(doctorController.updateEmail);

//.post(doctorController.createPatient);
// router.route('/:name').get(doctorController.getPatientByName);
doctorRouter.put('/acceptFollowUp/:followUpId', doctorController.acceptFollowUpRequest);
doctorRouter.put('/rejectFollowUp/:followUpId', doctorController.rejectFollowUpRequest);
doctorRouter.get('/viewFollowUp/:followUpId', doctorController.viewFollowUpRequests);

module.exports = { doctorRouter };
