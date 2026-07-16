const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - list products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// GET /api/products/:id - single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

module.exports = router;
