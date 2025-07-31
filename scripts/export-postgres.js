import { db } from '../server/db.js';
import { 
  users, 
  products, 
  orders, 
  orderItems, 
  cartItems 
} from '../shared/schema.js';
import fs from 'fs';
import path from 'path';

async function exportPostgresDatabase() {
  console.log('📤 Exporting PostgreSQL database...');
  
  try {
    const exportData = {
      timestamp: new Date().toISOString(),
      environment: 'production',
      database: 'postgresql',
      users: await db.select().from(users),
      products: await db.select().from(products),
      orders: await db.select().from(orders),
      orderItems: await db.select().from(orderItems),
      cartItems: await db.select().from(cartItems)
    };

    const exportPath = path.join(process.cwd(), 'exports', `database-export-postgres-${new Date().toISOString().split('T')[0]}.json`);
    
    // Create exports directory if it doesn't exist
    const exportsDir = path.dirname(exportPath);
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    
    console.log('✅ PostgreSQL database exported successfully!');
    console.log(`📁 Export file: ${exportPath}`);
    console.log(`📊 Exported data:`);
    console.log(`   - ${exportData.users.length} users`);
    console.log(`   - ${exportData.products.length} products`);
    console.log(`   - ${exportData.orders.length} orders`);
    console.log(`   - ${exportData.orderItems.length} order items`);
    console.log(`   - ${exportData.cartItems.length} cart items`);
    
  } catch (error) {
    console.error('❌ Error exporting PostgreSQL database:', error.message);
    process.exit(1);
  }
}

exportPostgresDatabase();