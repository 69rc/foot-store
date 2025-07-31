# Footwears - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Database Schema](#database-schema)
5. [API Reference](#api-reference)
6. [Frontend Components](#frontend-components)
7. [Authentication](#authentication)
8. [Deployment](#deployment)
9. [Development Guidelines](#development-guidelines)

---

## Project Overview

Footwears is a modern, full-stack e-commerce application built for selling shoes online. The application features a complete shopping experience with user authentication, product catalog, shopping cart, order management, and administrative tools.

### Key Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: SQLite (local), PostgreSQL (production)
- **ORM**: Drizzle ORM with Zod validation
- **Authentication**: Session-based with role management
- **UI Framework**: Radix UI components with shadcn/ui

---

## Architecture

### System Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│  Express API    │────│    Database     │
│                 │    │                 │    │   (SQLite/PG)   │
│  - React 18     │    │  - Express.js   │    │                 │
│  - TypeScript   │    │  - TypeScript   │    │  - Products     │
│  - Tailwind CSS │    │  - Drizzle ORM  │    │  - Users        │
│  - React Query  │    │  - Session Auth │    │  - Orders       │
│  - Wouter       │    │  - Zod Valid.   │    │  - Cart Items   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Folder Structure
```
footwears/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── lib/               # Utilities and configurations
│   │   │   ├── queryClient.ts # React Query setup
│   │   │   ├── utils.ts       # Utility functions
│   │   │   └── types.ts       # Type definitions
│   │   ├── hooks/             # Custom React hooks
│   │   └── App.tsx            # Main application component
│   ├── index.html
│   └── vite.config.ts
├── server/                     # Express backend application
│   ├── index.ts               # Main server entry (Replit)
│   ├── index-local.ts         # Local development server
│   ├── routes.ts              # API routes (Replit)
│   ├── routes-local.ts        # API routes (local)
│   ├── db.ts                  # Database connection (PostgreSQL)
│   ├── db-sqlite.ts           # Database connection (SQLite)
│   ├── localAuth.ts           # Local authentication
│   ├── replitAuth.ts          # Replit OIDC authentication
│   ├── storage.ts             # Data access layer
│   └── vite.ts                # Vite middleware
├── shared/                     # Shared code between client/server
│   ├── schema.ts              # PostgreSQL database schema
│   └── schema-sqlite.ts       # SQLite database schema
├── scripts/                    # Utility scripts
│   ├── setup-sqlite.js        # SQLite database setup
│   ├── seed-sqlite.js         # Database seeding
│   └── export-database-sqlite.js # Database export
├── migrations/                 # PostgreSQL migrations
├── migrations-sqlite/          # SQLite migrations
├── exports/                    # Database exports
└── local-database.sqlite       # SQLite database file
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git version control

### Quick Start (Local Development)

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd footwears
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Local Database**
   ```bash
   node scripts/setup-sqlite.js
   node scripts/seed-sqlite.js
   ```

4. **Build Frontend**
   ```bash
   npm run build
   ```

5. **Start Development Server**
   ```bash
   npx tsx server/index-local.ts
   ```

6. **Access Application**
   - URL: `http://localhost:5000`
   - Admin: `http://localhost:5000?user=admin`
   - Customer: `http://localhost:5000?user=customer`

### Production Setup (Replit)

1. **Environment Variables**
   ```bash
   DATABASE_URL=postgresql://...
   SESSION_SECRET=your-secret-key
   REPLIT_DOMAINS=your-domain.replit.app
   ```

2. **Database Migration**
   ```bash
   npm run db:push
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

---

## Database Schema

### Entity Relationship Diagram
```
Users (1) ──────── (N) Orders
  │                   │
  │                   │
  │ (1)               │ (1)
  │                   │
  └─── (N) CartItems  └─── (N) OrderItems
           │                     │
           │ (N)                 │ (N)
           │                     │
           └─── (1) Products (1) ─┘
```

### Table Schemas

#### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  profile_image_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'kids', 'sports')),
  sizes TEXT DEFAULT '[]',  -- JSON array
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  image_urls TEXT DEFAULT '[]',  -- JSON array
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total REAL NOT NULL,
  shipping_address TEXT,  -- JSON object
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  size TEXT
);
```

#### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  size TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### Sessions Table
```sql
CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  sess TEXT NOT NULL,
  expire INTEGER NOT NULL
);
```

---

## API Reference

### Authentication Endpoints

#### Get Current User
```http
GET /api/auth/user
Authorization: Session Cookie
```

**Response:**
```json
{
  "id": "user123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "customer"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Session Cookie
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?category=men&sizes=9,10&search=nike&minPrice=50&maxPrice=200&sortBy=price&sortOrder=asc
```

**Query Parameters:**
- `category`: Filter by category (men, women, kids, sports)
- `sizes`: Comma-separated list of sizes
- `search`: Search in product names
- `minPrice`, `maxPrice`: Price range filter
- `sortBy`: Sort field (name, price, createdAt)
- `sortOrder`: Sort direction (asc, desc)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nike Air Max 90",
    "description": "Classic comfort meets modern style",
    "price": 120.00,
    "category": "men",
    "sizes": ["8", "9", "10", "11", "12"],
    "stock": 50,
    "imageUrl": "...",
    "imageUrls": [],
    "isActive": true,
    "createdAt": "2025-01-10T10:00:00Z",
    "updatedAt": "2025-01-10T10:00:00Z"
  }
]
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/admin/products
Authorization: Session Cookie (Admin)
Content-Type: application/json

{
  "name": "New Shoe",
  "description": "Description",
  "price": 99.99,
  "category": "men",
  "sizes": ["8", "9", "10"],
  "stock": 25,
  "imageUrl": "...",
  "imageUrls": []
}
```

#### Update Product (Admin Only)
```http
PUT /api/admin/products/:id
Authorization: Session Cookie (Admin)
```

#### Delete Product (Admin Only)
```http
DELETE /api/admin/products/:id
Authorization: Session Cookie (Admin)
```

### Cart Endpoints

#### Get Cart Items
```http
GET /api/cart
Authorization: Session Cookie
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user123",
    "productId": 1,
    "quantity": 2,
    "size": "10",
    "createdAt": "2025-01-10T10:00:00Z",
    "product": {
      "id": 1,
      "name": "Nike Air Max 90",
      "price": 120.00,
      "imageUrl": "..."
    }
  }
]
```

#### Add to Cart
```http
POST /api/cart
Authorization: Session Cookie
Content-Type: application/json

{
  "productId": 1,
  "quantity": 1,
  "size": "10"
}
```

#### Update Cart Item
```http
PUT /api/cart/:id
Authorization: Session Cookie
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/:id
Authorization: Session Cookie
```

### Order Endpoints

#### Get Orders
```http
GET /api/orders
Authorization: Session Cookie
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user123",
    "status": "pending",
    "total": 240.00,
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country"
    },
    "createdAt": "2025-01-10T10:00:00Z",
    "orderItems": [
      {
        "id": 1,
        "quantity": 2,
        "price": 120.00,
        "size": "10",
        "product": {
          "name": "Nike Air Max 90",
          "imageUrl": "..."
        }
      }
    ]
  }
]
```

#### Create Order
```http
POST /api/orders
Authorization: Session Cookie
Content-Type: application/json

{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  }
}
```

#### Update Order Status (Admin Only)
```http
PUT /api/admin/orders/:id
Authorization: Session Cookie (Admin)
Content-Type: application/json

{
  "status": "shipped"
}
```

### Admin Endpoints

#### Get Dashboard Statistics
```http
GET /api/admin/stats
Authorization: Session Cookie (Admin)
```

**Response:**
```json
{
  "totalProducts": 25,
  "totalOrders": 150,
  "totalUsers": 75,
  "totalRevenue": 15000.00
}
```

---

## Frontend Components

### Component Architecture

#### Core Components
- **App.tsx** - Main application router and layout
- **Navigation.tsx** - Main navigation component
- **ProductCard.tsx** - Product display component
- **CartItem.tsx** - Shopping cart item component
- **OrderCard.tsx** - Order display component

#### Page Components
- **HomePage.tsx** - Landing page with featured products
- **ProductsPage.tsx** - Product catalog with filtering
- **ProductPage.tsx** - Individual product details
- **CartPage.tsx** - Shopping cart management
- **CheckoutPage.tsx** - Order checkout process
- **OrdersPage.tsx** - Order history
- **AdminPage.tsx** - Administrative dashboard

#### UI Components (shadcn/ui)
- **Button, Card, Dialog, Form, Input, Select, etc.**
- **Toast notifications**
- **Loading skeletons**
- **Error boundaries**

### State Management

#### React Query Integration
```typescript
// Query example
const { data: products, isLoading } = useQuery({
  queryKey: ['/api/products', filters],
  queryFn: () => apiRequest('/api/products', { params: filters }),
});

// Mutation example
const addToCartMutation = useMutation({
  mutationFn: (item: CartItem) => apiRequest('/api/cart', {
    method: 'POST',
    body: item,
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    toast.success('Added to cart!');
  },
});
```

### Routing Setup
```typescript
// App.tsx
import { Route, Switch } from 'wouter';

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
}
```

---

## Authentication

### Local Development Authentication
For local development, the application uses a simplified authentication system:

```typescript
// Local auth middleware
export async function localAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const userType = req.query.user as string || req.session?.userId;
  
  if (userType === 'admin') {
    req.user = await getAdminUser();
  } else if (userType === 'customer') {
    req.user = await getCustomerUser();
  }
  
  next();
}
```

**Usage:**
- Admin access: Add `?user=admin` to any URL
- Customer access: Add `?user=customer` to any URL

### Production Authentication (Replit OIDC)
The production version uses Replit's OIDC authentication:

```typescript
// Replit auth setup
import { setupAuth } from './replitAuth.js';

export async function setupReplitAuth(app: Express) {
  // Configure OIDC client
  // Setup passport strategies
  // Configure session management
}
```

### Session Management
```typescript
// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PostgreSQLStore({
    conObject: { connectionString: process.env.DATABASE_URL }
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));
```

### Role-Based Access Control
```typescript
// Middleware functions
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}
```

---

## Deployment

### Local Development Deployment

1. **Prerequisites**
   ```bash
   # Install dependencies
   npm install
   
   # Setup database
   node scripts/setup-sqlite.js
   node scripts/seed-sqlite.js
   ```

2. **Build and Start**
   ```bash
   # Build frontend
   npm run build
   
   # Start server
   npx tsx server/index-local.ts
   ```

3. **Access Application**
   - Application: `http://localhost:5000`
   - Admin panel: `http://localhost:5000?user=admin`
   - Customer view: `http://localhost:5000?user=customer`

### Replit Production Deployment

1. **Environment Setup**
   ```bash
   # Required environment variables
   DATABASE_URL=postgresql://user:pass@host:port/db
   SESSION_SECRET=your-secure-secret-key
   REPLIT_DOMAINS=your-app.replit.app
   ISSUER_URL=https://replit.com  # Optional
   ```

2. **Database Migration**
   ```bash
   # Push schema to production database
   npm run db:push
   ```

3. **Build and Deploy**
   ```bash
   # Build for production
   npm run build
   
   # Start production server
   npm start
   ```

4. **Deployment Verification**
   - Check application health
   - Verify database connectivity
   - Test authentication flow
   - Validate API endpoints

### Deployment Architecture
```
Internet ──→ Replit Load Balancer ──→ Application Server ──→ PostgreSQL Database
                     │                        │
                     └──→ Static Assets       └──→ Session Store
```

---

## Development Guidelines

### Code Style
- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Formatting**: Use Prettier for consistent formatting
- **Naming**: Use camelCase for variables, PascalCase for components

### Component Guidelines
```typescript
// Component structure
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function Component({ prop1, prop2 = 0 }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = useState();
  const query = useQuery(...);
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
}
```

### API Development
```typescript
// Route structure
app.get('/api/resource', middleware, async (req: Request, res: Response) => {
  try {
    // Validate input
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: validation.error.errors 
      });
    }
    
    // Business logic
    const result = await service.operation(validation.data);
    
    // Return response
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

### Database Operations
```typescript
// Use Drizzle ORM for type-safe queries
const products = await db
  .select()
  .from(productsTable)
  .where(eq(productsTable.category, 'men'))
  .orderBy(desc(productsTable.createdAt));

// Use transactions for complex operations
await db.transaction(async (tx) => {
  const order = await tx.insert(orders).values(orderData).returning();
  await tx.insert(orderItems).values(itemsData);
});
```

### Error Handling
```typescript
// Frontend error handling
try {
  const result = await apiRequest('/api/endpoint');
  // Handle success
} catch (error) {
  if (error.status === 401) {
    // Handle auth error
  } else if (error.status >= 500) {
    // Handle server error
  }
  toast.error(error.message);
}

// Backend error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error' });
});
```

### Testing Guidelines
```typescript
// Component testing
describe('ProductCard', () => {
  it('displays product information', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });
});

// API testing
describe('Products API', () => {
  it('returns products list', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

### Performance Optimization
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize database queries with proper indexing
- Use React Query for intelligent caching
- Implement proper error boundaries

### Security Best Practices
- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper session management
- Use HTTPS in production
- Follow principle of least privilege for user roles
- Sanitize output to prevent XSS attacks

---

This technical documentation provides comprehensive guidance for developing, deploying, and maintaining the Footwears e-commerce application. For additional support or questions, refer to the inline code comments and API documentation.