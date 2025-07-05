import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

// Simple session configuration for local development
export function getSession() {
  return session({
    secret: process.env.SESSION_SECRET || 'local-dev-secret-change-this',
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
    };

    try {
      // Create or update the test user
      await storage.upsertUser(testUser);
      
      // Store user in session
      req.session.user = { ...testUser, role: 'admin' }; // Make test user admin for easy testing
      
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
  app.get('/api/auth/user', async (req: any, res) => {
    if (req.session.user) {
      try {
        // Get user from database to ensure we have latest data
        const user = await storage.getUser(req.session.user.id);
        if (user) {
          const userWithRole = { ...user, role: req.session.user.role || 'customer' };
          res.json(userWithRole);
        } else {
          res.status(401).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
      }
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