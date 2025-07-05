require('dotenv').config();
const { Pool } = require('pg');

const sampleProducts = [
  {
    name: "Classic Oxford Brown",
    description: "Elegant brown leather oxford shoes perfect for formal occasions and business meetings.",
    price: "129.99",
    category: "men",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Elegant Black Heels",
    description: "Sophisticated black heels that combine style and comfort for the modern woman.",
    price: "89.99",
    category: "women",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Casual Canvas Sneakers",
    description: "Comfortable and stylish canvas sneakers perfect for everyday wear and casual outings.",
    price: "59.99",
    category: "men",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Kids Rainbow Sneakers",
    description: "Colorful and fun sneakers that kids will love, with comfortable padding and durable construction.",
    price: "39.99",
    category: "kids",
    sizes: ["10", "11", "12", "13", "1", "2", "3"],
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Athletic Running Shoes",
    description: "High-performance running shoes designed for serious athletes and fitness enthusiasts.",
    price: "159.99",
    category: "sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Women's White Sneakers",
    description: "Clean and versatile white sneakers that pair perfectly with any casual outfit.",
    price: "79.99",
    category: "women",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Leather Boots",
    description: "Rugged leather boots built to last, perfect for outdoor adventures and work environments.",
    price: "189.99",
    category: "men",
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Ballet Flats",
    description: "Comfortable and elegant ballet flats suitable for both office wear and casual occasions.",
    price: "69.99",
    category: "women",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 16,
    imageUrl: "https://images.unsplash.com/photo-1515955656015-4d906d54b0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Basketball Shoes",
    description: "Professional basketball shoes with superior grip and ankle support for optimal performance.",
    price: "149.99",
    category: "sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Kids School Shoes",
    description: "Durable and comfortable school shoes designed to withstand daily playground activities.",
    price: "49.99",
    category: "kids",
    sizes: ["10", "11", "12", "13", "1", "2", "3"],
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Tennis Shoes",
    description: "Professional tennis shoes with excellent court grip and lightweight design for quick movements.",
    price: "119.99",
    category: "sports",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Summer Sandals",
    description: "Lightweight and breathable sandals perfect for summer days and beach vacations.",
    price: "45.99",
    category: "women",
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

async function seedDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🌱 Starting database seeding...');

    // Check if products already exist
    const existingProducts = await pool.query('SELECT COUNT(*) FROM products');
    const productCount = parseInt(existingProducts.rows[0].count);

    if (productCount > 0) {
      console.log(`ℹ️  Database already contains ${productCount} products. Skipping seeding.`);
      console.log('💡 To force re-seed, delete all products first: DELETE FROM products;');
      return;
    }

    // Insert sample products
    for (const product of sampleProducts) {
      await pool.query(
        `INSERT INTO products (name, description, price, category, sizes, stock, "imageUrl", "isActive")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.sizes,
          product.stock,
          product.imageUrl,
          true
        ]
      );
      console.log(`✅ Added: ${product.name}`);
    }

    console.log(`🎉 Successfully seeded database with ${sampleProducts.length} products!`);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase().catch(error => {
    console.error('Failed to seed database:', error);
    process.exit(1);
  });
}

module.exports = { seedDatabase };