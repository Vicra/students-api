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

app.get('/alumno/:id', async function (req, res) {
    // validations
    const { id } = req.params;
    const user = await studentsService.getStudentById(id);
    if (user.length)
        res.send(user[0]);
});

app.delete('/alumno/:id', async function (req, res) {
    // validations
    const { id } = req.params;
    await studentsService.deleteStudentById(id);
    res.send({});
});

app.post('/alumno', function (req, res) {
    const alumno = req.body;
    studentsService.createStudent(alumno);
    res.send({});
});



app.listen(3000);