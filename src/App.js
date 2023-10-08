const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = process.env.MONGO_URI ;

const app = express();
const port = process.env.PORT || "8000";
const patient = require('../src/Models/Patient');
const doctor = require('../src/Models/Doctor')
const admin = require('../src/Models/user')

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

