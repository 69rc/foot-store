import type { Express, Request, Response } from "express";
import { db } from "./db-sqlite.js";
import { 
  products, 
  users, 
  orders, 
  orderItems, 
  cartItems,
  insertProductSchema,
  insertOrderSchema,
  insertCartItemSchema,
  type Product,
  type Order,
  type CartItemWithProduct,
  type OrderWithItems
} from "../shared/schema-sqlite.js";
import { requireAuth, requireAdmin } from "./auth.js";
import { eq, and, like, gte, lte, desc, asc } from "drizzle-orm";
import { z } from "zod";

export function setupRoutes(app: Express): void {
  // Product routes
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const { category, sizes, search, minPrice, maxPrice, sortBy = 'name', sortOrder = 'asc' } = req.query;

      // Start with base query
      let query = db.select().from(products).where(eq(products.isActive, true));

      const result = await query;
      
      // Apply filters in JavaScript for simplicity
      let filteredResult = result;
      
      if (category) {
        filteredResult = filteredResult.filter(product => product.category === category);
      }
      
      if (search) {
        filteredResult = filteredResult.filter(product => 
          product.name.toLowerCase().includes((search as string).toLowerCase())
        );
      }
      
      if (minPrice) {
        filteredResult = filteredResult.filter(product => product.price >= parseFloat(minPrice as string));
      }
      
      if (maxPrice) {
        filteredResult = filteredResult.filter(product => product.price <= parseFloat(maxPrice as string));
      }

      // Filter by sizes if provided
      if (sizes) {
        const sizeArray = (sizes as string).split(',');
        filteredResult = filteredResult.filter(product => {
          const productSizes = JSON.parse(product.sizes || '[]');
          return sizeArray.some(size => productSizes.includes(size));
        });
      }
      
      // Sort
      filteredResult.sort((a, b) => {
        let aVal: any, bVal: any;
        if (sortBy === 'price') {
          aVal = a.price;
          bVal = b.price;
        } else if (sortBy === 'createdAt') {
          aVal = a.createdAt;
          bVal = b.createdAt;
        } else {
          aVal = a.name;
          bVal = b.name;
        }
        
        if (sortOrder === 'desc') {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        } else {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        }
      });

      // Transform result to match expected Product type
      const transformedProducts: Product[] = filteredResult.map(product => ({
        ...product,
        sizes: JSON.parse(product.sizes || '[]'),
        imageUrls: JSON.parse(product.imageUrls || '[]'),
      }));

      res.json(transformedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
      
      if (!result.length) {
        return res.status(404).json({ message: "Product not found" });
      }

      const product = result[0];
      const transformedProduct: Product = {
        ...product,
        sizes: JSON.parse(product.sizes || '[]'),
        imageUrls: JSON.parse(product.imageUrls || '[]'),
      };

      res.json(transformedProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Admin-only product routes
  app.post('/api/admin/products', requireAdmin, async (req: Request, res: Response) => {
    try {
      const validation = insertProductSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid product data", errors: validation.error.errors });
      }

      const result = await db.insert(products).values(validation.data).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put('/api/admin/products/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validation = insertProductSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid product data", errors: validation.error.errors });
      }

      const result = await db.update(products)
        .set({ ...validation.data, updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning();

      if (!result.length) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(result[0]);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/admin/products/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      const result = await db.update(products)
        .set({ isActive: false })
        .where(eq(products.id, id))
        .returning();

      if (!result.length) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Cart routes
  app.get('/api/cart', requireAuth, async (req: Request, res: Response) => {
    try {
      const result = await db.select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        size: cartItems.size,
        createdAt: cartItems.createdAt,
        updatedAt: cartItems.updatedAt,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, req.user!.id));

      const transformedCart: CartItemWithProduct[] = result.map(item => ({
        ...item,
        product: {
          ...item.product,
          sizes: JSON.parse(item.product.sizes || '[]'),
          imageUrls: JSON.parse(item.product.imageUrls || '[]'),
        }
      }));

      res.json(transformedCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', requireAuth, async (req: Request, res: Response) => {
    try {
      const validation = insertCartItemSchema.safeParse({
        ...req.body,
        userId: req.user!.id
      });

      if (!validation.success) {
        return res.status(400).json({ message: "Invalid cart item data", errors: validation.error.errors });
      }

      // Check if item already exists
      const existing = await db.select()
        .from(cartItems)
        .where(and(
          eq(cartItems.userId, req.user!.id),
          eq(cartItems.productId, validation.data.productId),
          eq(cartItems.size, validation.data.size || '')
        ))
        .limit(1);

      if (existing.length > 0) {
        // Update quantity
        const result = await db.update(cartItems)
          .set({ 
            quantity: existing[0].quantity + validation.data.quantity,
            updatedAt: new Date()
          })
          .where(eq(cartItems.id, existing[0].id))
          .returning();
        
        res.json(result[0]);
      } else {
        // Create new item
        const result = await db.insert(cartItems).values(validation.data).returning();
        res.status(201).json(result[0]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put('/api/cart/:id', requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;

      const result = await db.update(cartItems)
        .set({ quantity, updatedAt: new Date() })
        .where(and(eq(cartItems.id, id), eq(cartItems.userId, req.user!.id)))
        .returning();

      if (!result.length) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(result[0]);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete('/api/cart/:id', requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      const result = await db.delete(cartItems)
        .where(and(eq(cartItems.id, id), eq(cartItems.userId, req.user!.id)))
        .returning();

      if (!result.length) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Orders and other routes can be added here with similar fixes
  // For now, keeping it simple to get the app running
}