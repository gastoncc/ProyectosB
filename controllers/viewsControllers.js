const Cart = require('../models/cartsModels');
const Product = require('../models/productsModels');

exports.getAllProductsView = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

exports.getCartView = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

