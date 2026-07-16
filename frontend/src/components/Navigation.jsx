import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navigation = ({ setIsCartOpen, onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home with search query
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <h1>KARTEY</h1>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/shop" 
            className={`nav-link ${isActive('/shop') ? 'active' : ''}`}
          >
            Shop
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Cart Icon */}
        <div className="nav-cart" onClick={() => setIsCartOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;