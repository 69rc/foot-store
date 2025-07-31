# Footwears - Local Development Setup

This guide will help you set up the Footwears e-commerce application for local development using SQLite.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Quick Start

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo>
   cd footwears
   npm install
   ```

2. **Set up Local SQLite Database**
   ```bash
   node scripts/setup-sqlite.js
   ```

3. **Seed Database with Sample Data**
   ```bash
   node scripts/seed-sqlite.js
   ```

4. **Build Frontend**
   ```bash
   npm run build
   ```

5. **Start Local Development Server**
   ```bash
   node server/index-local.js
   ```

6. **Access the Application**
   - Open your browser to: `http://localhost:5000`
   - Admin access: `http://localhost:5000?user=admin`
   - Customer access: `http://localhost:5000?user=customer`

## Local Development Features

### Authentication
- **No registration required** - Two test users are pre-created
- **Admin User**: `admin@footwears.com` (role: admin)
- **Customer User**: `customer@footwears.com` (role: customer)
- **Switch users** by adding `?user=admin` or `?user=customer` to any URL

### Database
- **SQLite database** located at `./local-database.sqlite`
- **Sample products** included (Nike, Adidas, Converse, Jordan, Puma)
- **Categories**: Men's, Women's, Kids', Sports shoes
- **Full shopping cart** and order functionality

### API Endpoints

#### Authentication
- `GET /api/auth/user?user=admin` - Get admin user
- `GET /api/auth/user?user=customer` - Get customer user
- `POST /api/auth/logout` - Logout current user

#### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get specific product
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

#### Shopping Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

#### Orders
- `GET /api/orders` - Get user's orders (or all orders for admin)
- `POST /api/orders` - Create order from cart
- `PUT /api/admin/orders/:id` - Update order status (admin only)

#### Admin Dashboard
- `GET /api/admin/stats` - Get dashboard statistics

## Project Structure

```
footwears/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities and hooks
├── server/                # Express backend
│   ├── index-local.ts     # Local development server
│   ├── routes-local.ts    # Local API routes
│   ├── db-sqlite.ts       # SQLite database setup
│   └── localAuth.ts       # Local authentication
├── shared/                # Shared types and schemas
│   ├── schema.ts          # PostgreSQL schema (Replit)
│   └── schema-sqlite.ts   # SQLite schema (local)
├── scripts/               # Setup and utility scripts
│   ├── setup-sqlite.js    # Database initialization
│   └── seed-sqlite.js     # Sample data seeding
└── local-database.sqlite  # SQLite database file
```

## Available Scripts

- `node scripts/setup-sqlite.js` - Initialize SQLite database
- `node scripts/seed-sqlite.js` - Add sample data
- `node server/index-local.js` - Start local development server
- `npm run build` - Build frontend for production

## Features Included

### 🛍️ **E-commerce Functionality**
- Product catalog with categories and filtering
- Shopping cart with size selection
- Order management and history
- Admin product management
- User role-based access control

### 👟 **Product Features**
- Multiple categories (Men's, Women's, Kids', Sports)
- Size selection for shoes
- Stock management
- Image support (base64 encoded for local dev)
- Product search and filtering

### 🔐 **Authentication**
- Simple user switching for development
- Admin and customer roles
- Session-based authentication
- Protected admin routes

### 📱 **Modern UI**
- Responsive design with Tailwind CSS
- React with TypeScript
- Modern component library (Radix UI)
- Dark/light theme support

## Database Schema

The local SQLite database includes these main tables:

- **users** - User accounts and profiles
- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **cart_items** - Shopping cart contents
- **sessions** - User session storage

## Troubleshooting

### Database Issues
```bash
# Reset database
rm local-database.sqlite
node scripts/setup-sqlite.js
node scripts/seed-sqlite.js
```

### Port Conflicts
```bash
# Change port in server/index-local.ts
const PORT = parseInt(process.env.PORT || '3000');
```

### Build Issues
```bash
# Clean build
rm -rf client/dist
npm run build
```

## Production Deployment

For production deployment on Replit, the application automatically switches to:
- PostgreSQL database with Neon
- Replit OIDC authentication
- Production environment variables

This local setup is designed for development and testing only.