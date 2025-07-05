# SoleStyle - E-commerce Shoe Store

A complete online shoe store built with React, Express.js, PostgreSQL, and Replit Auth.

## Features

- 🛍️ Complete e-commerce functionality with shopping cart
- 👟 Product catalog with categories (Men's, Women's, Kids', Sports)
- 🔐 User authentication with role-based access (Customer/Admin)
- 📱 Responsive design with modern UI
- 🎯 Admin dashboard for product and order management
- 🛒 Real-time cart updates and order processing
- 💳 Order history and status tracking

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OIDC (OpenID Connect)
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: TanStack Query (React Query)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd solestyle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: Using Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a new database:
```bash
createdb solestyle
```

3. Get your database connection string:
```
postgresql://username:password@localhost:5432/solestyle
```

#### Option B: Using Neon (Serverless PostgreSQL)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string provided

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/solestyle

# Session Security
SESSION_SECRET=your-super-secret-key-here-make-it-long-and-random

# Replit Auth (for local development, you'll need to set up a test app)
REPL_ID=your-replit-app-id
REPLIT_DOMAINS=localhost:5000
ISSUER_URL=https://replit.com/oidc

# PostgreSQL Connection Details (auto-extracted from DATABASE_URL)
PGHOST=localhost
PGPORT=5432
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=solestyle
```

### 5. Database Schema Setup

Run the database migrations:

```bash
npm run db:push
```

### 6. Seed the Database (Optional)

The application will automatically create sample products when you first run it. You can also manually add products through the admin interface.

### 7. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
solestyle/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # React hooks
│   │   └── lib/            # Utilities
├── server/                 # Express backend
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Database operations
│   ├── routes.ts          # API routes
│   └── replitAuth.ts      # Authentication
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── README.md
```

## Authentication Setup for Local Development

Since this app uses Replit Auth, you have a few options for local development:

### Option 1: Mock Authentication (Recommended for Local Development)

You can modify the authentication to use a simple mock system for local development. This is the easiest way to test the application locally.

### Option 2: Set up Replit OAuth App

1. Go to your Replit account settings
2. Create a new OAuth application
3. Set the callback URL to `http://localhost:5000/api/callback`
4. Use the provided client ID and secret in your environment variables

### Option 3: Use Alternative Auth Provider

You can modify the authentication to use providers like Auth0, Firebase Auth, or implement a simple local authentication system.

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Login redirect
- `GET /api/logout` - Logout
- `GET /api/callback` - OAuth callback

### Products
- `GET /api/products` - Get all products with optional filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status (admin only)

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Push database schema changes
npm run db:push

# Generate database migrations
npm run db:generate

# Run TypeScript type checking
npm run type-check
```

## Default Admin User

For testing, you can manually set a user's role to "admin" in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check your DATABASE_URL is correct
- Verify your database exists and is accessible

### Authentication Issues
- Check your environment variables are set correctly
- Ensure REPLIT_DOMAINS includes your local domain
- Verify your OAuth app configuration (if using Replit Auth)

### Port Conflicts
- The app runs on port 5000 by default
- If port 5000 is busy, the app will try the next available port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.