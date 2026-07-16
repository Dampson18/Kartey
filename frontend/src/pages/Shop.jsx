import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
      filterProducts(query);
    }
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const query = input.value;
    setSearchQuery(query);
    filterProducts(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
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
        <div className="shop-header">
          <h1 className="page-title">Shop</h1>
          <div className="shop-controls">
            <form className="shop-search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="shop-search-input"
                placeholder="Search products..."
                defaultValue={searchQuery}
              />
              <button type="submit" className="shop-search-btn">Search</button>
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={clearSearch}>
                  Clear
                </button>
              )}
            </form>
            <span className="product-count">{filteredProducts.length} products</span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-category">
            <p style={{ fontSize: '1.125rem', color: '#1A1614' }}>
              No products found matching "{searchQuery}"
            </p>
            <p style={{ fontFamily: 'Instrument Serif, serif', color: 'rgba(26, 22, 20, 0.5)', marginTop: '8px' }}>
              Try a different search term.
            </p>
            <div style={{ marginTop: '24px' }}>
              <button onClick={clearSearch} className="back-link">
                ← Clear search
              </button>
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
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

export default Shop;