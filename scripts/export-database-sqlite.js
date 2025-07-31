import { db, sqlite } from '../server/db-sqlite.js';
import { 
  users, 
  products, 
  orders, 
  orderItems, 
  cartItems 
} from '../shared/schema-sqlite.js';
import fs from 'fs';
import path from 'path';

async function exportDatabase() {
  console.log('📤 Exporting SQLite database...');
  
  try {
    const exportData = {
      timestamp: new Date().toISOString(),
      users: await db.select().from(users),
      products: await db.select().from(products),
      orders: await db.select().from(orders),
      orderItems: await db.select().from(orderItems),
      cartItems: await db.select().from(cartItems)
    };

    // Transform JSON fields for readability
    exportData.products = exportData.products.map(product => ({
      ...product,
      sizes: JSON.parse(product.sizes || '[]'),
      imageUrls: JSON.parse(product.imageUrls || '[]')
    }));

    exportData.orders = exportData.orders.map(order => ({
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress || '{}')
    }));

    const exportPath = path.join(process.cwd(), 'exports', `database-export-sqlite-${new Date().toISOString().split('T')[0]}.json`);
    
    // Create exports directory if it doesn't exist
    const exportsDir = path.dirname(exportPath);
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    
    console.log('✅ Database exported successfully!');
    console.log(`📁 Export file: ${exportPath}`);
    console.log(`📊 Exported data:`);
    console.log(`   - ${exportData.users.length} users`);
    console.log(`   - ${exportData.products.length} products`);
    console.log(`   - ${exportData.orders.length} orders`);
    console.log(`   - ${exportData.orderItems.length} order items`);
    console.log(`   - ${exportData.cartItems.length} cart items`);
    
  } catch (error) {
    console.error('❌ Error exporting database:', error.message);
    process.exit(1);
  }
}

exportDatabase();