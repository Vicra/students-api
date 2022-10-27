const studentsService = require("../services/students");
const { IsNumeric } = require("../utils/validator");
async function getStudents(_, res) {
    const students = await studentsService.getStudents();
    //TODO: mostrar clases en las que esta matriculado
    res.send(students);
}

async function getStudentById(req, res) {
    // try catch

    // validations of parameters

    // call to db (action)

    try {
        const { id } = req.params;
        const errorMessages = [];
        if (!id) {
            errorMessages.push("Parameter 'id' is required");
        }
        if (IsNumeric(id)) {
            errorMessages.push("Parameter 'id' needs to be an integer");
        }

        if (errorMessages.length) {
            res.status(400).send(errorMessages);
        } else {
            const student = await studentsService.getStudentById(id);
            if (student.length)
                res.send(student[0]);
            else {
                res.status(404).send("student does not exist");
            }
        }

    } catch (exception) {
        // logs

        // alerts

        res.status(500).send("internal server error");
    }
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