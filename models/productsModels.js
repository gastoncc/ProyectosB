const fs = require('fs/promises');
const path = require('path');

const PRODUCTS_FILE_PATH = path.join(__dirname, '../data/productos.json');

async function readProductsFromFile() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, retorna un array vacío
      return [];
    }
    throw error;
  }
}

async function readProductByIdFromFile(productId) {
  const products = await readProductsFromFile();
  return products.find(product => product.id === productId);
}

async function addProductToFile(newProduct) {
  const products = await readProductsFromFile();
  products.push(newProduct);
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

async function updateProductByIdInFile(productId, updatedProduct) {
  const products = await readProductsFromFile();
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  }
}

async function deleteProductByIdFromFile(productId) {
  const products = await readProductsFromFile();
  const filteredProducts = products.filter(product => product.id !== productId);
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(filteredProducts, null, 2), 'utf-8');
}

module.exports = {
  readProductsFromFile,
  readProductByIdFromFile,
  addProductToFile,
  updateProductByIdInFile,
  deleteProductByIdFromFile
};
