# 🚀 Footwears - Complete Local Setup Guide

## Quick Start Commands

```bash
# 1. Setup SQLite database
node scripts/setup-sqlite.js

# 2. Add sample data
node scripts/seed-sqlite.js

# 3. Build frontend
npm run build

# 4. Start local server
npx tsx server/index-local.ts

# 5. Open in browser
# http://localhost:5000?user=admin (Admin access)
# http://localhost:5000?user=customer (Customer access)
```

## What You Get

### 📊 **Sample Data Included**
- **2 Test Users**: Admin and Customer accounts
- **5 Sample Products**: Nike, Adidas, Converse, Jordan, Puma shoes
- **Complete Categories**: Men's, Women's, Kids', Sports
- **Real Shopping Experience**: Full cart and checkout functionality

### 🛠️ **Local Development Features**
- **SQLite Database**: No external database needed
- **Simple Authentication**: Switch between admin/customer with URL parameters
- **Hot Reload**: Frontend changes reflect immediately
- **Full API**: All endpoints working locally
- **Admin Panel**: Complete product and order management

### 📁 **Files Created**
- `local-database.sqlite` - Your local database
- `LOCAL_SETUP.md` - Detailed setup instructions
- `TECHNICAL_DOCUMENTATION.md` - Complete technical docs
- `SCHOOL_PRESENTATION.md` - Project presentation guide
- `exports/database-export-sqlite-*.json` - Database backup

## Usage Examples

### Customer Experience
1. Go to `http://localhost:5000?user=customer`
2. Browse products by category
3. Add items to cart with size selection
4. Complete checkout process
5. View order history

### Admin Experience
1. Go to `http://localhost:5000?user=admin`
2. Access admin dashboard
3. Manage products (create, edit, delete)
4. View and update order statuses
5. Monitor sales statistics

## API Testing

### Authentication
```bash
# Get current user
curl "http://localhost:5000/api/auth/user?user=admin"

# Logout
curl -X POST "http://localhost:5000/api/auth/logout"
```

### Products
```bash
# Get all products
curl "http://localhost:5000/api/products"

# Filter products
curl "http://localhost:5000/api/products?category=men&search=nike"

# Get specific product
curl "http://localhost:5000/api/products/1"
```

### Shopping Cart
```bash
# Get cart (requires user session)
curl "http://localhost:5000/api/cart" \
  -H "Cookie: connect.sid=YOUR_SESSION_ID"

# Add to cart
curl -X POST "http://localhost:5000/api/cart" \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_ID" \
  -d '{"productId": 1, "quantity": 1, "size": "10"}'
```

## Database Commands

```bash
# Export database
npx tsx scripts/export-database-sqlite.js

# Reset database
rm local-database.sqlite
node scripts/setup-sqlite.js
node scripts/seed-sqlite.js

# View database
sqlite3 local-database.sqlite ".tables"
sqlite3 local-database.sqlite "SELECT * FROM products;"
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/index-local.ts
const PORT = parseInt(process.env.PORT || '3000');
```

### Database Issues
```bash
# Reset everything
rm local-database.sqlite
rm -rf migrations-sqlite
node scripts/setup-sqlite.js
node scripts/seed-sqlite.js
```

### Build Errors
```bash
# Clean and rebuild
rm -rf client/dist
rm -rf node_modules
npm install
npm run build
```

## Development Tips

### Adding New Products
1. Access admin panel: `http://localhost:5000?user=admin`
2. Navigate to product management
3. Click "Add Product"
4. Fill in details and upload image
5. Product appears in catalog immediately

### Testing Orders
1. Switch to customer: `?user=customer`
2. Add products to cart
3. Complete checkout
4. Switch to admin: `?user=admin`
5. View and manage orders

### Database Inspection
```bash
# Install SQLite browser (optional)
# https://sqlitebrowser.org/

# Or use command line
sqlite3 local-database.sqlite
.tables
.schema products
SELECT * FROM products WHERE category = 'men';
```

## Next Steps

### School Presentation
- Use `SCHOOL_PRESENTATION.md` for project overview
- Demo both customer and admin features
- Show responsive design on different screen sizes
- Explain technical architecture and decisions

### Further Development
- Add payment integration
- Implement email notifications
- Add product reviews and ratings
- Create mobile app version
- Add advanced analytics

### Production Deployment
- The project automatically switches to PostgreSQL and Replit auth when deployed
- All local development work transfers seamlessly
- No code changes needed for production

---

**Your local e-commerce platform is ready!** 🎉

Start with `npx tsx server/index-local.ts` and visit `http://localhost:5000?user=admin` to begin exploring.