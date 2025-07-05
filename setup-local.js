#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up SoleStyle for local development...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/solestyle

# Session Security (generate a secure random string)
SESSION_SECRET=your-super-secret-key-here-change-this-to-something-random-and-secure

# Local Development Auth
NODE_ENV=development
REPL_ID=local-dev
REPLIT_DOMAINS=localhost:5000,127.0.0.1:5000
ISSUER_URL=https://replit.com/oidc

# PostgreSQL Connection Details
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=solestyle
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
  console.log('⚠️  Please update the DATABASE_URL and other settings in .env file');
} else {
  console.log('✅ .env file already exists');
}

// Create a local development authentication override
const localAuthPath = path.join(__dirname, 'server', 'localAuth.ts');
console.log('📝 Creating local authentication system...');

const localAuthContent = `import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

// Simple session configuration for local development
export function getSession() {
  return session({
    secret: process.env.SESSION_SECRET || 'local-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for local development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  });
}

// Simple local authentication for development
export async function setupLocalAuth(app: Express) {
  app.use(getSession());

  // Login route - creates a test user
  app.get('/api/login', async (req: any, res) => {
    const testUser = {
      id: 'test-user-123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      profileImageUrl: null,
      role: 'admin' // Make test user an admin for easy testing
    };

    try {
      // Create or update the test user
      await storage.upsertUser(testUser);
      
      // Store user in session
      req.session.user = testUser;
      
      res.redirect('/');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // Logout route
  app.get('/api/logout', (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/');
    });
  });

  // Get current user
  app.get('/api/auth/user', (req: any, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });
}

// Authentication middleware for local development
export const isAuthenticated: RequestHandler = (req: any, res, next) => {
  if (req.session.user) {
    req.user = { claims: { sub: req.session.user.id } };
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
`;

fs.writeFileSync(localAuthPath, localAuthContent);
console.log('✅ Local authentication system created');

// Create database initialization script
const dbInitPath = path.join(__dirname, 'init-db.js');
console.log('📝 Creating database initialization script...');

const dbInitContent = `const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/postgres';
  
  try {
    // Connect to PostgreSQL server (not specific database)
    const pool = new Pool({
      connectionString: connectionString.replace('/solestyle', '/postgres')
    });
    
    // Check if database exists
    const result = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'solestyle'"
    );
    
    if (result.rows.length === 0) {
      console.log('Creating database...');
      await pool.query('CREATE DATABASE solestyle');
      console.log('✅ Database created successfully');
    } else {
      console.log('✅ Database already exists');
    }
    
    await pool.end();
    
    // Now connect to the solestyle database and create tables
    const dbPool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/solestyle'
    });
    
    console.log('Setting up database schema...');
    
    // Run the schema setup
    const { execSync } = require('child_process');
    try {
      execSync('npm run db:push', { stdio: 'inherit' });
      console.log('✅ Database schema created successfully');
    } catch (error) {
      console.error('❌ Failed to create database schema:', error.message);
      console.log('💡 Try running: npm run db:push manually');
    }
    
    await dbPool.end();
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.log('💡 Make sure PostgreSQL is running and credentials are correct');
    console.log('💡 Update DATABASE_URL in .env file if needed');
  }
}

initializeDatabase();
`;

fs.writeFileSync(dbInitPath, dbInitContent);
console.log('✅ Database initialization script created');

// Create a simple start script
const startScriptPath = path.join(__dirname, 'start-local.js');
console.log('📝 Creating local start script...');

const startScriptContent = `#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

console.log('🚀 Starting SoleStyle in local development mode...');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.error('❌ .env file not found. Please run: node setup-local.js');
  process.exit(1);
}

// Set local development environment
process.env.NODE_ENV = 'development';
process.env.USE_LOCAL_AUTH = 'true';

try {
  // Start the development server
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
}
`;

fs.writeFileSync(startScriptPath, startScriptContent);
console.log('✅ Local start script created');

// Update package.json scripts
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add local development scripts
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['setup-local'] = 'node setup-local.js';
  packageJson.scripts['init-db'] = 'node init-db.js';
  packageJson.scripts['start-local'] = 'node start-local.js';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Package.json scripts updated');
}

console.log('\n🎉 Local development setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure PostgreSQL is running');
console.log('2. Update DATABASE_URL in .env file with your PostgreSQL credentials');
console.log('3. Run: npm run init-db (to create database and tables)');
console.log('4. Run: npm run start-local (to start the development server)');
console.log('\n💡 The app will be available at http://localhost:5000');
console.log('💡 Use test@example.com to login (admin user)');
`;

fs.writeFileSync(path.join(__dirname, 'setup-local.js'), 
  '#!/usr/bin/env node\n\n' + fs.readFileSync(__filename, 'utf8').split('\n').slice(1).join('\n'));