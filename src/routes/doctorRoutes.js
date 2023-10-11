const fs = require("fs");
const express = require('express');
const doctorController = require('../controllers/DoctorController');



const router = express.Router();

router.route('/getPatients').get(doctorController.getAllPatients);
// router.route('/getDoctors').get(doctorController.getAllDoctors);
// router.route('/getDoctor/:id').patch(doctorController.updateEmail);

//.post(doctorController.createPatient);
// router.route('/:name').get(doctorController.getPatientByName);
// router.route('/').get(DoctorController.getAllTours).post(DoctorController.createTour);
// router.route('/:id').get(DoctorController.getTour).patch(DoctorController.updateTour).delete(DoctorController.deleteTour);

module.exports = router;