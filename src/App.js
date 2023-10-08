const fs = require("fs");
const express = require("express");
const morgan = require('morgan');
const doctorRouter = require('./routes/doctorRoutes');


const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', doctorRouter);


//Server
const port = 5000;
app.listen(port, () => {
    console.log(`App running on ${port}...`);
})