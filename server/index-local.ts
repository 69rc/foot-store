import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Import local SQLite setup
import { authMiddleware, setupAuthRoutes } from './auth.js';
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

// Authentication middleware
app.use(authMiddleware);

// Setup authentication routes
setupAuthRoutes(app);

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
            <h1>🚀 Footwears Store</h1>
            <h2>Welcome to the Footwears Online Store</h2>
            <p>Please sign up or sign in to start shopping!</p>
            <h2>Setup Instructions:</h2>
            <ol>
              <li>Run: <code>npm run setup:local</code> to initialize the SQLite database</li>
              <li>Run: <code>npm run seed:local</code> to add sample data</li>
              <li>Run: <code>npm run build</code> to build the frontend</li>
              <li>Restart the server: <code>npm run dev</code></li>
            </ol>
            <h2>API Endpoints:</h2>
            <ul>
              <li><a href="/api/auth/user">GET /api/auth/user</a> - Get current user</li>
              <li><a href="/api/products">GET /api/products</a> - Get all products</li>
              <li>POST /api/auth/signup - Create new account</li>
              <li>POST /api/auth/signin - Sign in</li>
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