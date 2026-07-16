const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB locally'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Kartey API is running!' });
});

// Test database route
app.get('/api/test-db', (req, res) => {
  const status = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  res.json({ 
    message: 'Database test endpoint',
    status: statusMap[status] || 'Unknown'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}`);
});