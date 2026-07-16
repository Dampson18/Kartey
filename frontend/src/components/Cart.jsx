import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    // Format order message
    let message = '🛍️ *KARTEY ORDER*%0A%0A';
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    message += `%0A📦 *Total: $${getTotalPrice().toFixed(2)}*`;
    message += '%0A%0AThank you for your order!';

    // WhatsApp number (replace with your actual number)
    const phoneNumber = '233123456789'; // Ghana country code + number
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(url, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <p style={{ fontFamily: 'Instrument Serif, serif', color: 'rgba(26, 22, 20, 0.5)' }}>Browse our collection.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="total-price">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={handleWhatsAppOrder}
              >
                Order via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;