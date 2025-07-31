import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Import local SQLite setup
import { localAuthMiddleware } from './localAuth.js';
import { setupRoutes } from './routes-local.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '5000');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration for local development
app.use(session({
  secret: 'local-dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to false for local development
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Local authentication middleware
app.use(localAuthMiddleware);

// Setup API routes
setupRoutes(app);

// Serve static files from client build
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  
  // Serve React app for all non-API routes
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
} else {
  // Development mode - show instructions
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.send(`
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
            <h1>🚀 Footwears Local Development</h1>
            <h2>Setup Instructions:</h2>
            <ol>
              <li>Run: <code>npm run setup:local</code> to initialize the SQLite database</li>
              <li>Run: <code>npm run seed:local</code> to add sample data</li>
              <li>Run: <code>npm run build</code> to build the frontend</li>
              <li>Restart the server: <code>npm run dev:local</code></li>
            </ol>
            <h2>Authentication:</h2>
            <p>Add these parameters to any URL for local development:</p>
            <ul>
              <li><strong>Admin access:</strong> <code>?user=admin</code></li>
              <li><strong>Customer access:</strong> <code>?user=customer</code></li>
            </ul>
            <h2>API Endpoints:</h2>
            <ul>
              <li><a href="/api/auth/user?user=admin">GET /api/auth/user?user=admin</a> - Get admin user</li>
              <li><a href="/api/auth/user?user=customer">GET /api/auth/user?user=customer</a> - Get customer user</li>
              <li><a href="/api/products">GET /api/products</a> - Get all products</li>
            </ul>
          </body>
        </html>
      `);
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Local server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}?user=admin`);
  console.log(`🛒 Customer view: http://localhost:${PORT}?user=customer`);
});