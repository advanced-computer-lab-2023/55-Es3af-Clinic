const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require("cors");
const{router}=require("../src/routes/main")
const patientController = require('./controllers/PatientController');
const userController = require('./controllers/UserController');
const {auth} = require("./utils/auth");

//require("dotenv").config();
//const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = "mongodb+srv://55Es3af:SVH8v8XKZSxU1J6p@cluster0.zqasadb.mongodb.net/Clinic?retryWrites=true&w=majority" ;

const app = express();

app.use(express.json());

const port = process.env.PORT || "8000";

mongoose.connect(MongoURI, {dbName: 'Clinic'})
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your React app
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/login"  ,userController.login);
//app.put('/forgetPassword', userController.forgetPassword);

app.use("/", router);

app.get('/getSpec', patientController.getAllSpecialities)
