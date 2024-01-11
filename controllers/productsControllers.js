const { readProductsFromFile, readProductByIdFromFile, addProductToFile, updateProductByIdInFile, deleteProductByIdFromFile } = require('../models/productsModel');
const { v4: uuidv4 } = require('uuid');

async function getAllProducts(req, res) {
  try {
    const products = await readProductsFromFile();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function getProductById(req, res) {
  try {
    const productId = req.params.pid;
    const product = await readProductByIdFromFile(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function addProduct(req, res) {
  try {
    const newProduct = req.body;
    newProduct.id = uuidv4();
    await addProductToFile(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function updateProduct(req, res) {
  try {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    await updateProductByIdInFile(productId, updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.pid;
    await deleteProductByIdFromFile(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
