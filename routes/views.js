const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsControllers');

// Rutas para vistas
router.get('/products', viewsController.getAllProductsView);
router.get('/carts/:cid', viewsController.getCartView);

module.exports = router;


