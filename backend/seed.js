const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    name: 'Kartey Studio Print No. 01',
    description: 'A limited edition print from the Kartey Studio collection. Modernist by surface, rooted by name.',
    price: 150,
    category: 'Studio',
    stock: 25,
    images: ['studio-01.jpg'],
    isActive: true
  },
  {
    name: 'Kartey Parfums No. 01',
    description: 'A considered fragrance. Bergamot, cedar, and quiet warmth.',
    price: 85,
    category: 'Parfums',
    stock: 50,
    images: ['parfums-01.jpg'],
    isActive: true
  },
  {
    name: 'Kartey Editions: The Manifesto',
    description: 'A printed edition of the Kartey founding statement. 64 pages, letterpress printed.',
    price: 45,
    category: 'Editions',
    stock: 100,
    images: ['editions-01.jpg'],
    isActive: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert seed products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();