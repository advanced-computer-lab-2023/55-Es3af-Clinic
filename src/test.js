const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require("cors");
const{router}=require("../src/routes/main")
//require("dotenv").config();
//const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = "mongodb+srv://55Es3af:SVH8v8XKZSxU1J6p@cluster0.zqasadb.mongodb.net/Clinic?retryWrites=true&w=majority" ;

const app = express();
const port = process.env.PORT || "8000";
// const patient = require('./Models/Patient');
// const familyMember = require('./Models/FamilyMembers');
// const patientController = require('./controllers/PatientController')
// const registerPatientController = require('./controllers/RegisterPatientController');
// const requestDoctorController = require('./controllers/RequestDoctorController');
// const UserController= require('./controllers/UserController');
// const DoctorController = require('./controllers/DoctorController');


mongoose.connect(MongoURI, {dbName: 'Clinic'})
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

app.use(cors());
app.use(express.json())
app.use("/", router);
// app.post("/addFamilyMember", patientController.addFamilyMember);
// app.get("/viewFamilyMembers", patientController.viewFamilyMembers)
// app.get("/viewDoctors", patientController.viewDoctors)
// app.post("/registerPatient", registerPatientController.registerPatient)
// app.post("/requestDoctor", requestDoctorController.requestDoctor)
// app.get('/test', patientController.test)
// app.get("/users", UserController.getUsers)
// app.get("/patients", patientController.getPatients)
// app.get("/getDocReq", requestDoctorController.getDocReq)
// app.get('/getPatients', DoctorController.getAllPatients);
// app.get('/getDoctors', DoctorController.getAllDoctors);
// app.patch('/updateDoctors/:id', DoctorController.updateDoctor);
// app.post("/createAppointment", DoctorController.createAppointment);
//app.get("/filterAppointmentsByDate", DoctorController.filterAppointmentsByDate);
//app.get("/filterAppointmentsByDateAndStatus", patientController.filterAppointmentsByDateAndStatus);

// app.get("/filterAppointmentsByDateAndStatus", DoctorController.filterAppointmentsByDateAndStatus);
// app.get("/getAllMyPatients", DoctorController.getAllMyPatients);
// app.get("/searchPatientByName", DoctorController.searchPatientByName);
//app.get("/filterPatientsByUpcomingPendingAppointments", DoctorController.filterPatientsByUpcomingPendingAppointments);
//app.get("/viewHealthRecords", DoctorController.viewHealthRecords);
//app.post("/createHealthRecords", DoctorController.createHealthRecords);

// app.get('/searchDoc', patientController.searchByNameSpec)
// app.get('/viewDocInfo', patientController.viewDocInfo)
// app.get('/viewPrescriptions', patientController.viewPrescriptions)
// app.get('/specDate', patientController.searchBySpecDate)
//app.get('/searchDoc', patientController.searchDoctorsByName)
// // app.get('/viewPrescriptions', patientController.viewPrescriptions);

//// app.get('/filterprescriptions',patientController.filterprescriptionsbydatedoctorstatus)

