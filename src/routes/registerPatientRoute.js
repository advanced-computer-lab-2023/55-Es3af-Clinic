const Router = require('express')
const RegisterPatientController = require('../controllers/RegisterPatientController')

const registerPatientRoutes = new Router();

registerPatientRoutes.post('/',RegisterPatientController.registerPatient)

module.exports = {registerPatientRoutes}