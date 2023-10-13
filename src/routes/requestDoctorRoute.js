const Router = require('express')
const requestDoctorController = require('../controllers/RequestDoctorController');

const requestDoctorRoutes = new Router();

requestDoctorRoutes.post('/',requestDoctorController.requestDoctor)

module.exports = {requestDoctorRoutes}