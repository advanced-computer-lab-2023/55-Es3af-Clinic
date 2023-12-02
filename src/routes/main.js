const Router = require("express");
const userController = require("../controllers/UserController")
const {patientRoutes} = require('../routes/patientRoutes');
const {doctorRouter} = require('../routes/doctorRoutes');
const {requestDoctorRoutes} = require('../routes/requestDoctorRoute');
const {registerPatientRoutes} = require('../routes/registerPatientRoute');
const {adminRoutes} = require('../routes/adminRoutes');
const {packageRoutes} = require('../routes/packagesRoutes');
const {contractRoutes} = require("../routes/contractRoutes")

// const patient = require('./Models/Patient');
// const patientController = require('./controllers/PatientController')
// const UserController= require('./controllers/UserController');

const router = new Router();

router.use("/patient",patientRoutes);
router.use("/doctor",doctorRouter);
router.use('/contract',contractRoutes);
router.use("/requestDoctor",requestDoctorRoutes);
router.use("/register",registerPatientRoutes);
router.use("/admin", adminRoutes);
router.use("/packages", packageRoutes);
router.get("/logout", userController.logout);
router.post('/forgetPassword', userController.forgetPassword)
router.put('/resetPassword', userController.resetPassword)
module.exports={router};