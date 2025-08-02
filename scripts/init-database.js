import { db } from '../server/db-sqlite.js';
import { users, products } from '../shared/schema-sqlite.js';
import bcrypt from 'bcryptjs';

// Create a default admin user
async function initDatabase() {
  try {
    console.log('Initializing SQLite database...');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const customerPassword = await bcrypt.hash('customer123', 12);
    
    // Insert default users
    await db.insert(users).values([
      {
        id: 'admin-local',
        email: 'admin@footwears.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      },
      {
        id: 'customer-local', 
        email: 'customer@footwears.com',
        password: customerPassword,
        firstName: 'Customer',
        lastName: 'User',
        role: 'customer'
      }
    ]).onConflictDoNothing();
    
    // Insert sample products
    await db.insert(products).values([
      {
        name: 'Classic Running Shoes',
        description: 'Comfortable running shoes perfect for daily workouts',
        price: 89.99,
        category: 'sports',
        sizes: JSON.stringify(['7', '8', '9', '10', '11']),
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        imageUrls: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'])
      },
      {
        name: 'Casual Sneakers',
        description: 'Stylish casual sneakers for everyday wear',
        price: 69.99,
        category: 'men',
        sizes: JSON.stringify(['7', '8', '9', '10', '11']),
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        imageUrls: JSON.stringify(['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'])
      }
    ]).onConflictDoNothing();
    
    console.log('Database initialized successfully!');
    console.log('Default users:');
    console.log('- Admin: admin@footwears.com / admin123');
    console.log('- Customer: customer@footwears.com / customer123');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDatabase();