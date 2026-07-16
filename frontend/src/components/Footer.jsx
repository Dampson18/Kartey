import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <h2>KARTEY</h2>
            <p className="footer-tagline">A house of inherited taste</p>
            <p className="footer-description">
              Modernist by surface. Rooted by name. Made for those who notice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Categories */}
          <div className="footer-links">
            <h3>Categories</h3>
            <Link to="/studio">Studio</Link>
            <Link to="/parfums">Parfums</Link>
            <Link to="/editions">Editions</Link>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Connect</h3>
            <a href="mailto:hello@kartey.com">hello@kartey.com</a>
            <a href="https://wa.me/233123456789">WhatsApp</a>
            <p className="footer-location">Accra, Ghana</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} KARTEY. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;