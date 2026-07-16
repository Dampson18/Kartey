const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  // STUDIO PRODUCTS
  {
    name: 'Studio Print No. 01',
    description: 'A limited edition print from the Kartey Studio collection. Modernist by surface, rooted by name.',
    price: 150,
    category: 'Studio',
    stock: 25,
    images: ['studio-01.jpg'],
    isActive: true
  },
  {
    name: 'Studio Print No. 02',
    description: 'The second edition in the Studio print series. Clean lines, quiet presence.',
    price: 180,
    category: 'Studio',
    stock: 20,
    images: ['studio-02.jpg'],
    isActive: true
  },
  {
    name: 'Motion Study No. 01',
    description: 'A study in form and movement. Digital print on fine art paper.',
    price: 200,
    category: 'Studio',
    stock: 15,
    images: ['motion-01.jpg'],
    isActive: true
  },

  // PARFUMS PRODUCTS
  {
    name: 'Parfums No. 01',
    description: 'A considered fragrance. Bergamot, cedar, and quiet warmth.',
    price: 85,
    category: 'Parfums',
    stock: 50,
    images: ['parfums-01.jpg'],
    isActive: true
  },
  {
    name: 'Parfums No. 02',
    description: 'Vetiver, black pepper, and a hint of smoke. For the discerning nose.',
    price: 95,
    category: 'Parfums',
    stock: 40,
    images: ['parfums-02.jpg'],
    isActive: true
  },
  {
    name: 'Decant Set No. 01',
    description: 'Three small portions. The perfect introduction to the Parfums collection.',
    price: 45,
    category: 'Parfums',
    stock: 60,
    images: ['decant-01.jpg'],
    isActive: true
  },

  // EDITIONS PRODUCTS
  {
    name: 'The Manifesto',
    description: 'A printed edition of the Kartey founding statement. 64 pages, letterpress printed.',
    price: 45,
    category: 'Editions',
    stock: 100,
    images: ['manifesto-01.jpg'],
    isActive: true
  },
  {
    name: 'Monograph No. 01',
    description: 'The first monograph from Kartey Editions. A deep dive into the studio practice.',
    price: 65,
    category: 'Editions',
    stock: 75,
    images: ['monograph-01.jpg'],
    isActive: true
  },
  {
    name: 'Poster Set No. 01',
    description: 'Three posters in a limited edition set. Printed on archival paper.',
    price: 120,
    category: 'Editions',
    stock: 30,
    images: ['poster-01.jpg'],
    isActive: true
  }
];

async function seedMoreProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert all products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products:`);
    
    // Show count by category
    const counts = {};
    inserted.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    console.log('📊 Products by category:', counts);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedMoreProducts();