const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController");

// enlace de routes
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.deleteStudentById);
router.put('/:id', studentController.updateStudent);
router.post('/', studentController.createStudent);

module.exports = router;