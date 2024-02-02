const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControllers');

// Rutas para productos
router.get('/', productsController.getAllProducts);

module.exports = router;

