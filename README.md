# SoleStyle - E-commerce Shoe Store

A modern e-commerce application for selling shoes online, built with React, Express.js, and PostgreSQL.

## Features

- **User Authentication**: Secure login with Replit OIDC
- **Product Management**: Admin interface for managing shoe inventory
- **Shopping Cart**: Persistent cart functionality
- **Order Processing**: Complete order management system
- **Image Upload**: Drag-and-drop image upload with automatic compression
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js + TypeScript, Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: Replit OIDC with session storage

## Quick Start (Replit)

1. Open this project in Replit
2. The application will automatically install dependencies
3. Click "Run" to start the development server
4. Visit the provided URL to access the application
5. Use "Login" to authenticate with your Replit account

## Local Development Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solestyle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/solestyle
   SESSION_SECRET=your-session-secret-key-here
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Create a PostgreSQL database and run migrations:
   ```bash
   # Create database
   createdb solestyle
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with sample data
- `npm run db:export` - Export database to JSON file

## Database Export/Import

### Export Database
```bash
npm run db:export
```
This creates a timestamped export file in the `exports/` directory.

### Import Sample Data
```bash
npm run db:seed
```
This adds sample products to get you started.

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
├── scripts/               # Utility scripts
└── exports/               # Database exports (created automatically)
```

## Admin Features

Access the admin panel at `/admin` (requires admin role):

- Add/edit/delete products
- Upload product images with automatic compression
- Manage inventory and stock levels
- View and manage orders

## API Endpoints

### Products
- `GET /api/products` - List all products with filters
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin only)

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Initiate login
- `GET /api/logout` - Logout user

## Troubleshooting

### Database Connection Issues
1. Verify your `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Check database permissions

### Image Upload Issues
1. Images are automatically compressed to 800x800 max
2. File size limit is 5MB before compression
3. Only JPEG, PNG, GIF formats supported

### Session Issues
1. Ensure `SESSION_SECRET` is set in environment
2. Check that cookies are enabled in browser
3. Verify domain configuration for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.