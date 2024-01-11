const fs = require('fs/promises');
const path = require('path');

const CARTS_FILE_PATH = path.join(__dirname, '../data/carrito.json');

async function readCartsFromFile() {
  try {
    const data = await fs.readFile(CARTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, retorna un array vacío
      return [];
    }
    throw error;
  }
}

async function readCartProductsFromFile(cartId) {
  const carts = await readCartsFromFile();
  const cart = carts.find(c => c.id === cartId);
  return cart ? cart.products : null;
}

async function addProductToCart(cartId, productId, quantity) {
  const carts = await readCartsFromFile();
  const index = carts.findIndex(c => c.id === cartId);
  if (index !== -1) {
    const existingProducts = carts[index].products || [];
    const existingProductIndex = existingProducts.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex].quantity += quantity;
    } else {
      existingProducts.push({ id: productId, quantity });
    }
    carts[index].products = existingProducts;
    await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2), 'utf-8');
  }
}

async function addCartToFile(newCart) {
  const carts = await readCartsFromFile();
  carts.push(newCart);
  await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2), 'utf-8');
}

module.exports = {
  readCartsFromFile,
  readCartProductsFromFile,
  addProductToCart,
  addCartToFile
};
