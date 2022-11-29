const express = require("express");
const router = express.Router();

const getOrders = require("../controllers/orderController");

// enlace de routes
router.get('/', getOrders);

module.exports = router;