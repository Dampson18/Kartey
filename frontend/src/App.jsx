import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app">
      <Navigation setIsCartOpen={setIsCartOpen} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/studio" element={<CategoryPage />} />
          <Route path="/parfums" element={<CategoryPage />} />
          <Route path="/editions" element={<CategoryPage />} />
        </Routes>
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;