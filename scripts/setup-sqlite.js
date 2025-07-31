import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function setupLocalDatabase() {
  console.log('🚀 Setting up local SQLite database...');
  
  try {
    // Create migrations directory if it doesn't exist
    if (!fs.existsSync('migrations-sqlite')) {
      fs.mkdirSync('migrations-sqlite');
    }

    // Generate migrations for SQLite schema
    console.log('📝 Generating SQLite migrations...');
    await execAsync('npx drizzle-kit generate --config=drizzle.config.sqlite.ts');
    
    // Apply migrations
    console.log('🔄 Applying migrations...');
    await execAsync('npx drizzle-kit migrate --config=drizzle.config.sqlite.ts');
    
    console.log('✅ Local SQLite database setup complete!');
    console.log('📁 Database file: local-database.sqlite');
    
  } catch (error) {
    console.error('❌ Error setting up local database:', error.message);
    process.exit(1);
  }
}

setupLocalDatabase();