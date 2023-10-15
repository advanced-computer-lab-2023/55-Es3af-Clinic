const fs = require("fs");
const express = require('express');
const doctorController = require('../controllers/DoctorController');



const doctorRouter = express.Router();

doctorRouter.route('/getPatients').get(doctorController.getAllPatients);
doctorRouter.route('/getAllDoctors').get(doctorController.getAllDoctors);
doctorRouter.route('/createHealthRecords').post(doctorController.createHealthRecords);
doctorRouter.route('/createAppointment').post(doctorController.createAppointment);
doctorRouter.route('/updateDoctor').put(doctorController.updateDoctor);
doctorRouter.route('/viewHealthRecords').get(doctorController.viewHealthRecords);
doctorRouter.route('/searchPatientByName').get(doctorController.searchPatientByName);
doctorRouter.route('/getAllMyPatients').get(doctorController.getAllMyPatients);
doctorRouter.route('/filterAppointmentsByDateAndStatus/:id').get(doctorController.filterAppointmentsByDateAndStatus);
doctorRouter.route('/filterPatientsByUpcomingPendingAppointments').get(doctorController.filterPatientsByUpcomingPendingAppointments);
doctorRouter.route('/selectPatient').patch(doctorController.selectPatient);

// router.route('/getDoctors').get(doctorController.getAllDoctors);
// router.route('/getDoctor/:id').patch(doctorController.updateEmail);

//.post(doctorController.createPatient);
// router.route('/:name').get(doctorController.getPatientByName);
// router.route('/').get(DoctorController.getAllTours).post(DoctorController.createTour);
// router.route('/:id').get(DoctorController.getTour).patch(DoctorController.updateTour).delete(DoctorController.deleteTour);

module.exports = {doctorRouter};