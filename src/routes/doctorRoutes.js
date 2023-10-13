const fs = require("fs");
const express = require('express');
const doctorController = require('../controllers/DoctorController');



const doctorRouter = express.Router();

doctorRouter.route('/getPatients').get(doctorController.getAllPatients);
doctorRouter.route('/getAllDoctors').get(doctorController.getAllDoctors);
doctorRouter.route('/createHealthRecords').get(doctorController.createHealthRecords);
doctorRouter.route('/createAppointment').get(doctorController.createAppointment);
doctorRouter.route('/updateDoctor').get(doctorController.updateDoctor);
doctorRouter.route('/viewHealthRecords').get(doctorController.viewHealthRecords);
doctorRouter.route('/searchPatientByName').get(doctorController.searchPatientByName);
doctorRouter.route('/getAllMyPatients').get(doctorController.getAllMyPatients);
doctorRouter.route('/filterAppointmentsByDateAndStatus').get(doctorController.filterAppointmentsByDateAndStatus);
doctorRouter.route('/filterPatientsByUpcomingPendingAppointments').get(doctorController.filterPatientsByUpcomingPendingAppointments);

// router.route('/getDoctors').get(doctorController.getAllDoctors);
// router.route('/getDoctor/:id').patch(doctorController.updateEmail);

//.post(doctorController.createPatient);
// router.route('/:name').get(doctorController.getPatientByName);
// router.route('/').get(DoctorController.getAllTours).post(DoctorController.createTour);
// router.route('/:id').get(DoctorController.getTour).patch(DoctorController.updateTour).delete(DoctorController.deleteTour);

module.exports = {doctorRouter};