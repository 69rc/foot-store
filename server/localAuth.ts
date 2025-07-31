import type { Request, Response, NextFunction } from 'express';
import { db } from './db-sqlite.js';
import { users } from '../shared/schema-sqlite.js';
import { eq } from 'drizzle-orm';
import type { User } from '../shared/schema-sqlite.js';

// Extend session type
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Simple local authentication for development
export async function localAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  // In local development, we'll simulate authentication
  // You can switch users by adding ?user=admin or ?user=customer to any URL
  
  const userType = req.query.user as string || req.session?.userId;
  
  try {
    let user: User | undefined;
    
    if (userType === 'admin') {
      user = await db.select().from(users).where(eq(users.id, 'admin-local')).limit(1).then(rows => rows[0]);
    } else if (userType === 'customer') {
      user = await db.select().from(users).where(eq(users.id, 'customer-local')).limit(1).then(rows => rows[0]);
    }
    
    if (user) {
      req.session!.userId = user.id;
      req.user = user;
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    next();
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Not authenticated. Add ?user=admin or ?user=customer to your URL for local development.' 
    });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Not authenticated. Add ?user=admin to your URL for admin access.' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Admin access required. Add ?user=admin to your URL.' 
    });
  }
  
  next();
}

// Add missing functions for compatibility with routes.ts
export async function setupLocalAuth(app: any) {
  // Local auth setup is handled in index-local.ts
  return;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  return requireAuth(req, res, next);
}