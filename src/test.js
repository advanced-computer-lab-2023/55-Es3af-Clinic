const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require("cors");
const{router}=require("../src/routes/main")
const patientController = require('./controllers/PatientController');
const userController = require('./controllers/UserController');
const {auth} = require("./utils/auth");
const http =require("http")


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
 const server = app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
  const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
  });
  socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
  
    //sends the message to all the users on the server
    socket.on('message', (data) => {
      console.log(data)
      // Relaing the message to all listeners
      console.log("emitting")
      socket.emit(`messageResponse`, data);
    });
  
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });
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
app.put('/forgetPassword', userController.forgetPassword);
//app.use(auth);
app.use("/", router);




app.get('/getSpec', patientController.getAllSpecialities)


