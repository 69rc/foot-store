# Footwears Local Deployment Guide

This guide will help you set up and run the Footwears e-commerce application on your local machine.

## Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Footwears

# 2. Run the setup script
node scripts/setup-local.js

# 3. Set up the database
npm run db:push

# 4. Add sample products
npm run seed

# 5. Start the application
npm run local
```

Visit `http://localhost:5000` and click "Sign In" to create a test admin user.

## Detailed Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher) - Download from [nodejs.org](https://nodejs.org)
- **PostgreSQL** (v13 or higher) - Install locally or use a cloud service

### PostgreSQL Setup Options

#### Option 1: Local PostgreSQL Installation

**Windows:**
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and set a password for the `postgres` user
3. Start PostgreSQL service

**macOS:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
createdb Footwears
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb Footwears
```

#### Option 2: Cloud PostgreSQL (Recommended)

**Using Neon (Free):**
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Update `DATABASE_URL` in your `.env` file

**Using Supabase (Free):**
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string
6. Update `DATABASE_URL` in your `.env` file

### Environment Configuration

After running the setup script, update your `.env` file:

```env
# Update this with your actual database credentials
DATABASE_URL=postgresql://username:password@localhost:5432/Footwears

# Generate a secure session secret
SESSION_SECRET=your-generated-secret-key

# Local development settings
USE_LOCAL_AUTH=true
NODE_ENV=development
```

### Database Schema Creation

```bash
# Create all database tables
npm run db:push

# Verify tables were created
psql $DATABASE_URL -c "\dt"
```

### Sample Data

```bash
# Add 12 sample products to the database
npm run seed

# Or run both schema and seed together
npm run reset-db
```

### Running the Application

```bash
# Start with local authentication
npm run local

# Or use the regular dev command (uses Replit auth)
npm run dev
```

## Available Scripts

- `node scripts/setup-local.js` - Initial setup for local development
- `npm run db:push` - Create/update database schema
- `npm run seed` - Add sample products to database
- `npm run reset-db` - Reset schema and add sample data
- `npm run local` - Start with local authentication
- `npm run dev` - Start with Replit authentication
- `npm run build` - Build for production

## Authentication in Local Development

The application includes a simplified authentication system for local development:

- **Login URL**: `http://localhost:5000/api/login`
- **Default User**: Creates a test admin user automatically
- **Email**: `test@example.com`
- **Role**: Admin (can access admin panel)

## Features Available Locally

✅ **Working Features:**
- Product catalog browsing
- Shopping cart functionality
- Order placement and history
- Admin product management
- Admin order management
- User authentication
- Responsive design

✅ **Admin Functions:**
- Add/edit/delete products
- View all orders
- Update order status
- Manage inventory

## Troubleshooting

### Database Connection Issues

**Error: `ECONNREFUSED`**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS

# Start PostgreSQL if not running
sudo systemctl start postgresql  # Linux
brew services start postgresql  # macOS
```

**Error: `database "Footwears" does not exist`**
```bash
# Create the database
createdb Footwears

# Or using psql
psql -U postgres -c "CREATE DATABASE Footwears;"
```

**Error: `password authentication failed`**
```bash
# Update your .env file with correct credentials
# Or reset PostgreSQL password
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'newpassword';"
```

### Port Issues

**Error: `Port 5000 is already in use`**
- The application will automatically try the next available port
- Or manually stop the process using port 5000:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <process-id>
```

### Permission Issues

**Error: `permission denied`**
```bash
# Make scripts executable
chmod +x scripts/*.js

# Or run with node directly
node scripts/setup-local.js
```

### Node.js Version Issues

**Error: `Unsupported Node.js version`**
- Install Node.js v18 or higher from [nodejs.org](https://nodejs.org)
- Or use a version manager like nvm:
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set secure values for all environment variables
2. **Database**: Use a managed PostgreSQL service
3. **Authentication**: Configure proper OAuth provider or implement custom auth
4. **HTTPS**: Enable SSL/TLS certificates
5. **Process Management**: Use PM2 or similar for process management

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure your database is running and accessible
4. Check the application logs for specific error messages

## File Structure

```
Footwears/
├── client/              # React frontend
├── server/              # Express backend
├── shared/              # Shared types and schemas
├── scripts/             # Setup and utility scripts
├── .env.example         # Environment variables template
├── README.md            # Main documentation
└── DEPLOYMENT_GUIDE.md  # This file
```