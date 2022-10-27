const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// instancias de routes
const studentsRouter = require("./routes/studentRoutes");
const classRouter = require("./routes/classRoutes");

// Definicion de routes
app.use('/student', studentsRouter);
app.use('/class', classRouter);


app.listen(3000);