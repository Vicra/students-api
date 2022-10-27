const classesService = require("../services/classes");

async function getClasses(_, res) {
    const classes = await classesService.getClasses();
    //TODO: mostrar clases en las que esta matriculado
    res.send(classes);
}

async function getClassById(req, res) {
    // validations
    const { id } = req.params;
    const user = await classesService.getClassById(id);
    if (user.length)
        res.send(user[0]);
}

async function deleteClassById(req, res) {
    // validations
    const { id } = req.params;
    await classesService.deleteClassById(id);
    res.send({});
}

async function updateClass(req, res) {
    // parametros
    const { id } = req.params;
    const classObj = req.body;

    //validar parametros

    // llamado a bd actualizar
    await classesService.updateClass(id, classObj);

    res.status(204).send();
}

function createClass(req, res) {
    const alumno = req.body;
    classesService.createClass(alumno);
    res.send({});
}

module.exports = {
    getClasses,
    getClassById,
    deleteClassById,
    updateClass,
    createClass
};