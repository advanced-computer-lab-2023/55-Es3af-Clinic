const Router = require("express");
const {patientRoutes} = require('../routes/patientRoutes');
const {doctorRouter} = require('../routes/doctorRoutes');
const {requestDoctorRoutes} = require('../routes/requestDoctorRoute');
const {registerPatientRoutes} = require('../routes/registerPatientRoute');

// const patient = require('./Models/Patient');
// const patientController = require('./controllers/PatientController')
// const UserController= require('./controllers/UserController');

const router= new Router();

router.use("/patient",patientRoutes);
router.use("/doctor",doctorRouter);
router.use("/requestDoctor",requestDoctorRoutes);
router.use("/register",registerPatientRoutes);
module.exports={router};