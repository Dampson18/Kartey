import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show a success message
    // Later you can connect this to a backend email service
    setSubmitted(true);
    
    // Open WhatsApp with the message
    const message = `📝 *New Contact Form Message*%0A%0A👤 Name: ${formData.name}%0A📧 Email: ${formData.email}%0A💬 Message: ${formData.message}`;
    const phoneNumber = '233123456789'; // Replace with your number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="contact-section">
          <h1 className="page-title">Contact</h1>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                For inquiries about our products, collaborations, or just to say hello — 
                we'd love to hear from you.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email</strong>
                  <a href="mailto:hello@kartey.com">hello@kartey.com</a>
                </div>
                <div className="contact-item">
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/233123456789">+233 12 345 6789</a>
                </div>
                <div className="contact-item">
                  <strong>Location</strong>
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="form-success">
                  <h3>Thank You</h3>
                  <p>Your message has been sent. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;