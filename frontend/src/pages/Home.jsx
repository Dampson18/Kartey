import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">A House of Inherited Taste</h1>
          <p className="hero-subtitle">
            Modernist by surface. Rooted by name. Made for those who notice.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">All Products</h2>
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
        </div>
      </section>
    </div>
  );
};

export default Home;