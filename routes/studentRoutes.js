const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController");

// enlace de routes
router.get('/', studentController.getStudents);
router.get('/getById', studentController.getStudentById2);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.deleteStudentById);
router.put('/:id', studentController.updateStudent);
router.post('/', studentController.createStudent);

// auth
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);


module.exports = router;