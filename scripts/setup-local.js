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

// Check if npm is available
try {
  execSync('npm --version', { stdio: 'ignore' });
  console.log('✅ npm is available');
} catch (error) {
  console.error('❌ npm is not available. Please install Node.js and npm');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/solestyle

# Session Security (generate a secure random string)
SESSION_SECRET=${generateRandomString(64)}

# Local Development Auth
NODE_ENV=development
USE_LOCAL_AUTH=true
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
  console.log('⚠️  Please update DATABASE_URL and other settings in .env file if needed');
} else {
  console.log('✅ .env file already exists');
}

// Add .env to .gitignore if not already there
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  if (!gitignoreContent.includes('.env')) {
    console.log('📝 Adding .env to .gitignore...');
    fs.appendFileSync(gitignorePath, '\n# Environment variables\n.env\n');
    console.log('✅ Added .env to .gitignore');
  }
} else {
  console.log('📝 Creating .gitignore...');
  const gitignoreContent = `# Dependencies
node_modules/

# Environment variables
.env

# Build outputs
dist/
build/

# Logs
*.log
logs/

# OS generated files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Database
*.sqlite
*.db
`;
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('✅ .gitignore created');
}

// Install dependencies if node_modules doesn't exist
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

console.log('\n🎉 Local development setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure PostgreSQL is running on your system');
console.log('2. Update DATABASE_URL in .env file with your PostgreSQL credentials');
console.log('3. Run: npm run db:push (to create database tables)');
console.log('4. Run: npm run seed (to add sample products)');
console.log('5. Run: npm run local (to start with local authentication)');
console.log('\n💡 The app will be available at http://localhost:5000');
console.log('💡 Use the login button to create a test admin user');
console.log('\n📚 For more information, see README.md');

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}