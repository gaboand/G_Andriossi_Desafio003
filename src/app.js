import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./src/whiskies.json');

app.use(express.json());

app.get('/products', (req, res) => {
  const { limit } = req.query;
  const products = limit ? productManager.getProducts().slice(0, parseInt(limit)) : productManager.getProducts();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = productManager.getProductById(parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
});
