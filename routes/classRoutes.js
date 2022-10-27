const express = require("express");
const router = express.Router();

const classController = require("../controllers/classesController");

// enlace de routes
router.get('/', classController.getClasses);
router.get('/:id', classController.getClassById);
router.delete('/:id', classController.deleteClassById);
router.put('/:id', classController.updateClass);
router.post('/', classController.createClass);

module.exports = router;