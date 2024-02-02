const Cart = require('../models/cartsModels');

exports.getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await Cart.findByIdAndUpdate(cid, { $pull: { products: { _id: pid } } });
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    await Cart.findByIdAndUpdate(cid, { products });
    res.json({ status: 'success', message: 'Carrito actualizado' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    await Cart.updateOne({ _id: cid, 'products._id': pid }, { $set: { 'products.$.quantity': quantity } });
    res.json({ status: 'success', message: 'Cantidad del producto actualizada en el carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    await Cart.findByIdAndUpdate(cid, { products: [] });
    res.json({ status: 'success', message: 'Productos eliminados del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};
