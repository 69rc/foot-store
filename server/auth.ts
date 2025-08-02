import type { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db-sqlite.js";
import { users } from "../shared/schema-sqlite.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "crypto";

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
      user?: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role: string;
        profileImageUrl?: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function setupAuthRoutes(app: Express): void {
  // Sign up route
  app.post('/api/auth/signup', async (req: Request, res: Response) => {
    try {
      const validation = signUpSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: validation.error.errors 
        });
      }

      const { email, password, firstName, lastName } = validation.data;

      // Check if user already exists
      const existingUser = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const userId = randomUUID();
      const newUser = await db.insert(users).values({
        id: userId,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "customer",
      }).returning();

      // Set session
      req.session!.userId = userId;

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser[0];
      res.status(201).json({ 
        message: "Account created successfully", 
        user: userWithoutPassword 
      });
    } catch (error) {
      console.error("Sign up error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Sign in route
  app.post('/api/auth/signin', async (req: Request, res: Response) => {
    try {
      const validation = signInSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: validation.error.errors 
        });
      }

      const { email, password } = validation.data;

      // Find user
      const userResult = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (userResult.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = userResult[0];

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Set session
      req.session!.userId = user.id;

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        message: "Signed in successfully", 
        user: userWithoutPassword 
      });
    } catch (error) {
      console.error("Sign in error:", error);
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  // Sign out route
  app.post('/api/auth/signout', (req: Request, res: Response) => {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to sign out" });
      }
      res.json({ message: "Signed out successfully" });
    });
  });

  // Get current user
  app.get('/api/auth/user', async (req: Request, res: Response) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const userResult = await db.select()
        .from(users)
        .where(eq(users.id, req.session.userId))
        .limit(1);

      if (userResult.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = userResult[0];
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });
}

// Authentication middleware
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session?.userId) {
      return next();
    }

    const userResult = await db.select()
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (userResult.length > 0) {
      const { password: _, ...userWithoutPassword } = userResult[0];
      req.user = userWithoutPassword;
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next();
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Authentication required. Please sign in.' 
    });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Authentication required. Please sign in.' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Admin access required.' 
    });
  }
  
  next();
}