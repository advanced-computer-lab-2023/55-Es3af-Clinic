const Router = require('express')
const {registerPatientController} = require('../controllers/RegisterPatientController')

const registerPatientRoutes = new Router();

registerPatientRoutes.post('/',registerPatientController.registerPatient)

module.exports = {registerPatientRoutes}