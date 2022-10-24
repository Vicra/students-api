const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// import de modulos user defined
const studentsService = require("./services/students");

app.get('/alumno', async function (_, res) {
    const students = await studentsService.getStudents();
    //TODO: mostrar clases en las que esta matriculado
    res.send(students);
});

app.post('/alumno', function (req, res) {
    const alumno = req.body;
    res.send({});
});

app.listen(3000);