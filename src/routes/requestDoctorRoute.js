const Router = require('express')
const RequestDoctorController = require('../controllers/RequestDoctorController')

const requestDoctorRoutes = new Router();

requestDoctorRoutes.post('/',RequestDoctorController.requestDoctor)

module.exports = {requestDoctorRoutes}