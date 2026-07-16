import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      // Filter products by category (case insensitive)
      const filtered = response.data.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const getCategoryDescription = () => {
    switch(category.toLowerCase()) {
      case 'studio':
        return 'Image, motion, and form. The creative practice within the house.';
      case 'parfums':
        return 'Fragrance, in small portions. Decants and curation for the curious.';
      case 'editions':
        return 'Publishing, print, and the written word.';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">{categoryTitle}</h1>
        <p className="category-description">{getCategoryDescription()}</p>

        {products.length === 0 ? (
          <div className="empty-category">
            <p style={{ fontSize: '1.125rem', color: '#1A1614' }}>No products available in this category yet.</p>
            <p style={{ fontFamily: 'Instrument Serif, serif', color: 'rgba(26, 22, 20, 0.5)', marginTop: '8px' }}>
              Check back soon.
            </p>
            <div style={{ marginTop: '24px' }}>
              <a href="/" className="back-link">← Browse all products</a>
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.category}
                </div>
                <div className="product-info">
                  <div className="product-header">
                    <div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                    </div>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                    <button 
                      className={`add-to-cart ${product.stock > 0 ? 'active' : 'disabled'}`}
                      disabled={product.stock === 0}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;