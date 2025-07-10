#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function exportDatabase() {
  try {
    console.log('🔄 Exporting database...');
    
    const client = pool;
    
    // Export users
    const users = await client.query('SELECT * FROM users');
    console.log(`📊 Exported${users.rows.length} users`);
    
    // Export products
    const products = await client.query('SELECT * FROM products');
    console.log(`📦 Exported${products.rows.length} products`);
    
    // Export orders
    const orders = await client.query('SELECT * FROM orders');
    console.log(`🛒 Exported${orders.rows.length} orders`);
    
    // Export order items
    const orderItems = await client.query('SELECT * FROM order_items');
    console.log(`📝 Exported${orderItems.rows.length} order items`);
    
    // Export cart items
    const cartItems = await client.query('SELECT * FROM cart_items');
    console.log(`🛒 Exported${cartItems.rows.length} cart items`);
    
    // Create export object
    const exportData = {
      timestamp: new Date().toISOString(),
      database_name: 'solestyle_db',
      tables: {
        users: users.rows,
        products: products.rows,
        orders: orders.rows,
        order_items: orderItems.rows,
        cart_items: cartItems.rows
      }
    };
    
    // Create exports directory if it doesn't exist
    const exportsDir = path.join(__dirname, '..', 'exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `solestyle-db-export-₦{timestamp}.json`;
    const filepath = path.join(exportsDir, filename);
    
    // Write to file
    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));
    
    console.log('✅ Database export completed successfully!');
    console.log(`📁 Export saved to:${filepath}`);
    console.log(`📊 Total records exported:${users.rows.length + products.rows.length + orders.rows.length + orderItems.rows.length + cartItems.rows.length}`);
    
    // Also create a latest export for easy access
    const latestPath = path.join(exportsDir, 'latest-export.json');
    fs.writeFileSync(latestPath, JSON.stringify(exportData, null, 2));
    console.log(`🔗 Latest export available at:${latestPath}`);
    
  } catch (error) {
    console.error('❌ Error exporting database:', error);
    process.exit(1);
  }
}

// Run the export
exportDatabase();