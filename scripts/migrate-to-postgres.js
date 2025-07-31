import { db as sqliteDb } from '../server/db-sqlite.js';
import { db as postgresDb } from '../server/db.js';
import { 
  users, 
  products, 
  orders, 
  orderItems, 
  cartItems 
} from '../shared/schema.js';
import { 
  users as sqliteUsers,
  products as sqliteProducts,
  orders as sqliteOrders,
  orderItems as sqliteOrderItems,
  cartItems as sqliteCartItems
} from '../shared/schema-sqlite.js';

async function migrateToPostgres() {
  console.log('🔄 Migrating data from SQLite to PostgreSQL...');
  
  try {
    // Get data from SQLite
    const sqliteUsersData = await sqliteDb.select().from(sqliteUsers);
    const sqliteProductsData = await sqliteDb.select().from(sqliteProducts);
    const sqliteOrdersData = await sqliteDb.select().from(sqliteOrders);
    const sqliteOrderItemsData = await sqliteDb.select().from(sqliteOrderItems);
    const sqliteCartItemsData = await sqliteDb.select().from(sqliteCartItems);

    console.log(`📊 Found data to migrate:`);
    console.log(`   - ${sqliteUsersData.length} users`);
    console.log(`   - ${sqliteProductsData.length} products`);
    console.log(`   - ${sqliteOrdersData.length} orders`);
    console.log(`   - ${sqliteOrderItemsData.length} order items`);
    console.log(`   - ${sqliteCartItemsData.length} cart items`);

    // Clear existing PostgreSQL data
    console.log('🧹 Clearing existing PostgreSQL data...');
    await postgresDb.delete(cartItems);
    await postgresDb.delete(orderItems);
    await postgresDb.delete(orders);
    await postgresDb.delete(products);
    await postgresDb.delete(users);

    // Migrate users
    if (sqliteUsersData.length > 0) {
      console.log('👥 Migrating users...');
      const usersToInsert = sqliteUsersData.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
      await postgresDb.insert(users).values(usersToInsert);
    }

    // Migrate products
    if (sqliteProductsData.length > 0) {
      console.log('👟 Migrating products...');
      const productsToInsert = sqliteProductsData.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        sizes: JSON.parse(product.sizes || '[]'),
        stock: product.stock,
        imageUrl: product.imageUrl,
        imageUrls: JSON.parse(product.imageUrls || '[]'),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }));
      await postgresDb.insert(products).values(productsToInsert);
    }

    // Migrate orders
    if (sqliteOrdersData.length > 0) {
      console.log('📦 Migrating orders...');
      const ordersToInsert = sqliteOrdersData.map(order => ({
        id: order.id,
        userId: order.userId,
        status: order.status,
        total: order.total.toString(),
        shippingAddress: JSON.parse(order.shippingAddress || '{}'),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }));
      await postgresDb.insert(orders).values(ordersToInsert);
    }

    // Migrate order items
    if (sqliteOrderItemsData.length > 0) {
      console.log('📋 Migrating order items...');
      const orderItemsToInsert = sqliteOrderItemsData.map(item => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toString(),
        size: item.size
      }));
      await postgresDb.insert(orderItems).values(orderItemsToInsert);
    }

    // Migrate cart items
    if (sqliteCartItemsData.length > 0) {
      console.log('🛒 Migrating cart items...');
      const cartItemsToInsert = sqliteCartItemsData.map(item => ({
        id: item.id,
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));
      await postgresDb.insert(cartItems).values(cartItemsToInsert);
    }

    console.log('✅ Migration completed successfully!');
    console.log('🎉 Your SQLite data is now available in PostgreSQL');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

migrateToPostgres();