const fs = require("fs");
const express = require('express');
const doctorController = require('../controllers/DoctorController');



const router = express.Router();

router.route('/').get(doctorController.getAllPatients).post(doctorController.createPatient);
// router.route('/').get(DoctorController.getAllTours).post(DoctorController.createTour);
// router.route('/:id').get(DoctorController.getTour).patch(DoctorController.updateTour).delete(DoctorController.deleteTour);

module.exports = router;