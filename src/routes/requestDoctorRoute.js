const Router = require('express')
const RequestDoctorController = require('../controllers/RequestDoctorController')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const requestDoctorRoutes = new Router();

//requestDoctorRoutes.post('/',RequestDoctorController.requestDoctor)

requestDoctorRoutes.post('/', upload.fields([
  { name: 'IDdoc', maxCount: 1 },
  { name: 'MedicalLicenses', maxCount: 10 },
  { name: 'MedicalDegree', maxCount: 1 },
]), RequestDoctorController.requestDoctor);
module.exports = {requestDoctorRoutes}