const {
    getStudents
    , getStudentById
    , deleteStudentById
    , updateStudent
    , createStudent
} = require("../services/students");

const { isDecimal } = require("../utils/validator");

async function getStudents(_, res) {
    const students = await getStudents();
    //TODO: mostrar clases en las que esta matriculado
    res.send(students);
}

async function getStudentById(req, res) {
    try {
        const { id } = req.params;
        const errorMessages = [];
        if (!id) {
            errorMessages.push("Parameter 'id' is required");
        }
        if (isDecimal(id)) {
            errorMessages.push("Parameter 'id' needs to be an integer");
        }

        if (errorMessages.length) {
            res.status(400).send(errorMessages);
        } else {
            const student = await getStudentById(id);
            if (student.length)
                res.send(student[0]);
            else {
                res.status(404).send("student does not exist");
            }
        }

    } catch (exception) {
        res.status(500).send("internal server error");
    }
}

async function getStudentById2(req, res) {
    try {
        const { id } = req.query;
        const errorMessages = [];
        if (!id) {
            errorMessages.push("Parameter 'id' is required");
        }
        if (isDecimal(id)) {
            errorMessages.push("Parameter 'id' needs to be an integer");
        }

        if (errorMessages.length) {
            res.status(400).send(errorMessages);
        } else {
            const student = await getStudentById(id);
            if (student.length)
                res.send(student[0]);
            else {
                res.status(404).send("student does not exist");
            }
        }

    } catch (exception) {
        res.status(500).send("internal server error");
    }
}

async function deleteStudentById(req, res) {
    // validations
    const { id } = req.params;
    await deleteStudentById(id);
    res.send({});
}

async function updateStudent(req, res) {
    // parametros
    const { id } = req.params;
    const student = req.body;

    //validar parametros

    // llamado a bd actualizar
    await updateStudent(id, student);

    res.status(204).send();
}

function createStudent(req, res) {
    const alumno = req.body;
    createStudent(alumno);
    res.send({});
}

module.exports = {
    getStudents,
    getStudentById,
    getStudentById2,
    deleteStudentById,
    updateStudent,
    createStudent
};