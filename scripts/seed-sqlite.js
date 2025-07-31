import { db } from '../server/db-sqlite.js';
import { products, users } from '../shared/schema-sqlite.js';

async function seedDatabase() {
  console.log('🌱 Seeding SQLite database...');
  
  try {
    // Create admin user
    await db.insert(users).values({
      id: 'admin-local',
      email: 'admin@footwears.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });

    // Create sample customer
    await db.insert(users).values({
      id: 'customer-local',
      email: 'customer@footwears.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
    });

    // Sample products data
    const sampleProducts = [
      {
        name: "Nike Air Max 90",
        description: "Classic comfort meets modern style",
        price: 120.00,
        category: "men",
        sizes: JSON.stringify(["8", "9", "10", "11", "12"]),
        stock: 50,
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5pa2UgQWlyIE1heDwvdGV4dD48L3N2Zz4=",
        imageUrls: JSON.stringify([]),
        isActive: true,
      },
      {
        name: "Adidas Ultraboost",
        description: "Energy-returning running shoes",
        price: 180.00,
        category: "sports",
        sizes: JSON.stringify(["7", "8", "9", "10", "11"]),
        stock: 30,
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFkaWRhcyBVbHRyYWJvb3N0PC90ZXh0Pjwvc3ZnPg==",
        imageUrls: JSON.stringify([]),
        isActive: true,
      },
      {
        name: "Converse Chuck Taylor",
        description: "Timeless canvas sneakers",
        price: 55.00,
        category: "women",
        sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
        stock: 75,
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2M3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbnZlcnNlIEFsbCBTdGFyPC90ZXh0Pjwvc3ZnPg==",
        imageUrls: JSON.stringify([]),
        isActive: true,
      },
      {
        name: "Jordan 1 Retro",
        description: "Iconic basketball shoe",
        price: 170.00,
        category: "men",
        sizes: JSON.stringify(["8", "9", "10", "11", "12", "13"]),
        stock: 25,
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkpvcmRhbiAxIFJldHJvPC90ZXh0Pjwvc3ZnPg==",
        imageUrls: JSON.stringify([]),
        isActive: true,
      },
      {
        name: "Puma Suede Kids",
        description: "Classic suede sneakers for kids",
        price: 45.00,
        category: "kids",
        sizes: JSON.stringify(["1", "2", "3", "4", "5"]),
        stock: 40,
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRmNGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlB1bWEgU3VlZGUgS2lkczwvdGV4dD48L3N2Zz4=",
        imageUrls: JSON.stringify([]),
        isActive: true,
      },
    ];

    // Insert sample products
    for (const product of sampleProducts) {
      await db.insert(products).values(product);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`👥 Created 2 users (1 admin, 1 customer)`);
    console.log(`👟 Created ${sampleProducts.length} sample products`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();