const express = require("express");
const router = express.Router();

const classController = require("../controllers/classesController");

const { authenticateToken } = require('../auth/middleware');
// enlace de routes
router.get('/', authenticateToken, classController.getClasses);
router.get('/:id', authenticateToken, classController.getClassById);
router.delete('/:id', classController.deleteClassById);
router.put('/:id', classController.updateClass);
router.post('/', classController.createClass);

module.exports = router;