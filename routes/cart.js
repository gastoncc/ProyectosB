const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsControllers');

// Rutas para carritos
router.get('/:cid', cartsController.getCartById);
router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);
router.delete('/:cid', cartsController.clearCart);

module.exports = router;

