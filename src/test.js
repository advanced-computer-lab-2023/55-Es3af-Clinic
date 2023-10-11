const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
//require("dotenv").config();
//const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = "mongodb+srv://55Es3af:SVH8v8XKZSxU1J6p@cluster0.zqasadb.mongodb.net/Clinic?retryWrites=true&w=majority" ;

const app = express();
const port = process.env.PORT || "8000";
const patient = require('./Models/Patient');
const familyMember = require('./Models/FamilyMembers');
const patientController = require('./controllers/PatientController')
const registerPatientController = require('./controllers/RegisterPatientController');
const requestDoctorController = require('./controllers/RequestDoctorController');


mongoose.connect(MongoURI, {dbName: 'Clinic'})
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));


app.use(express.json())
app.post("/addFamilyMember", patientController.addFamilyMember);
app.get("/viewFamilyMembers", patientController.viewFamilyMembers)
app.get("/viewDoctors", patientController.viewDoctors)
app.post("/registerPatient", registerPatientController.registerPatient)
app.post("/requestDoctor", requestDoctorController.requestDoctor)
app.get('/test', patientController.test)
