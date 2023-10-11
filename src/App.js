const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
const MongoURI = process.env.MONGO_URI ;
const fs = require("fs");
const morgan = require('morgan');
const doctorRouter = require('./routes/doctorRoutes');


const app = express();
const portno = "8000";
const port = process.env.PORT || "8000";
const patient = require('../src/Models/Patient.js');
const doctor = require('../src/Models/Doctor.js');
const admin = require('./src/Models/User.js');

app.use(morgan('dev'));
app.use(express.json());
app.use('/', doctorRouter);

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// =======
  // console.log("MongoDB is now connected!");
// >>>>>>> 97ff4692c65b2183e30082f48573b8bb7d9ce553
// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
})
.catch((err) => console.log(err));


//Server
// app.listen(port, () => {
//     console.log(`App running on ${port}...`);
// })