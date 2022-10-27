const studentsService = require("../services/students");

async function getStudents(_, res) {
    const students = await studentsService.getStudents();
    //TODO: mostrar clases en las que esta matriculado
    res.send(students);
}

async function getStudentById(req, res) {
    // validations
    const { id } = req.params;
    const user = await studentsService.getStudentById(id);
    if (user.length)
        res.send(user[0]);
}

async function deleteStudentById(req, res) {
    // validations
    const { id } = req.params;
    await studentsService.deleteStudentById(id);
    res.send({});
}

async function updateStudent(req, res) {
    // parametros
    const { id } = req.params;
    const student = req.body;

    //validar parametros

    // llamado a bd actualizar
    await studentsService.updateStudent(id, student);

    res.status(204).send();
}

function createStudent(req, res) {
    const alumno = req.body;
    studentsService.createStudent(alumno);
    res.send({});
}

module.exports = {
    getStudents,
    getStudentById,
    deleteStudentById,
    updateStudent,
    createStudent
};