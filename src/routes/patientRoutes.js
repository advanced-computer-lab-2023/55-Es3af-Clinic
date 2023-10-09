const express = require('express')
const patientController = require('../controllers/PatientController')

const router = express.Router()

router.route('/viewDoctors').get(patientController.viewDoctors)

module.exports = router