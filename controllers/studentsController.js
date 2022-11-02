const {
    getStudents: get
    , getStudentById: getById
    , deleteStudentById: deleteById
    , updateStudent: update
    , createStudent: create,
    register
} = require("../services/students");
const { successResponse, badRequestResponse } = require("../utils/responseBuilder");

const { IsEmail, IsPassword } = require("../utils/validator");
const crypto = require("crypto");

const HTTPCodes = {
    OK: 200,
    CREATED: 201,
    UPDATED: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

const { isDecimal } = require("../utils/validator");

async function registerStudent(req, res) {
    const { email, password, name, age } = req.body;
    // validations
    const errorMessages = [];
    if (!email) {
        errorMessages.push("Parameter 'email' is required");
    }
    else if (!IsEmail(email)) {
        errorMessages.push("Invalid 'email' format");
    }

    if (!password) {
        errorMessages.push("Parameter 'password' is required");
    }
    if (!IsPassword(password)) {
        errorMessages.push("Invalid 'password' format");
    }

    if (!name) {
        errorMessages.push("Parameter 'name' is required");
    }
    if (typeof name !== "string") {
        errorMessages.push("Invalid 'name' type");
    }

    if (age && isNaN(age)) {
        errorMessages.push("Parameter 'age' needs to be a numeric value");
    }

    if (errorMessages.length) {
        res.status(HTTPCodes.BAD_REQUEST).send(badRequestResponse(errorMessages));
    } else {
        // action
        const salt = crypto.randomBytes(128).toString('base64');
        const encryptedPassword = crypto.pbkdf2Sync(password, salt, parseInt(process.env.HASH_ITERATIONS), parseInt(process.env.KEY_LENGTH), "sha256").toString('base64');

        // call to db
        /*
        const student = req.body;
        student.salt = salt;
        student.encryptedPassword = encryptedPassword;
         
        este y el de abajo somos lo mismo
        */

        const student2 = {
            ...req.body,
            salt,
            encryptedPassword
        };

        const studentId = register(student2);
        res.send(successResponse(studentId));
    }
}

async function getStudents(_, res) {
    const students = await get();
    res.send(successResponse(students));
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
            res.status(HTTPCodes.BAD_REQUEST).send(errorMessages);
        } else {
            const student = await getById(id);
            if (student.length)
                res.status(HTTPCodes.OK).send(student[0]);
            else {
                res.status(HTTPCodes.NOT_FOUND).send(
                    badRequestResponse("student does not exist",
                        HTTPCodes.NOT_FOUND));
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
            const student = await getById(id);
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
    await deleteById(id);
    res.send({});
}

async function updateStudent(req, res) {
    // parametros
    const { id } = req.params;
    const student = req.body;

    //validar parametros

    // llamado a bd actualizar
    await update(id, student);

    res.status(204).send();
}

async function createStudent(req, res) {
    const alumno = req.body;
    const created = await create(alumno);
    if (created) {
        res.send({ id: created[0] });
    } else {
        res.send("Unable to create");
    }

}

module.exports = {
    getStudents,
    getStudentById,
    getStudentById2,
    deleteStudentById,
    updateStudent,
    createStudent,
    registerStudent
};