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
import { requireAuth, requireAdmin } from "./localAuth.js";
import { eq, and, like, gte, lte, desc, asc } from "drizzle-orm";
import { z } from "zod";

// The Express Request type is already extended in localAuth.ts

export function setupRoutes(app: Express): void {
  // Auth routes
  app.get('/api/auth/user', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Not authenticated. Add ?user=admin or ?user=customer to your URL for local development.' 
        });
      }
      res.json(req.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Product routes
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const { category, sizes, search, minPrice, maxPrice, sortBy = 'name', sortOrder = 'asc' } = req.query;

      let query = db.select().from(products).where(eq(products.isActive, true));

      if (category) {
        query = query.where(eq(products.category, category as string));
      }

      if (search) {
        query = query.where(like(products.name, `%${search}%`));
      }

      if (minPrice) {
        query = query.where(gte(products.price, parseFloat(minPrice as string)));
      }

      if (maxPrice) {
        query = query.where(lte(products.price, parseFloat(maxPrice as string)));
      }

      // Add sorting
      const sortColumn = products[sortBy as keyof typeof products] || products.name;
      if (sortOrder === 'desc') {
        query = query.orderBy(desc(sortColumn));
      } else {
        query = query.orderBy(asc(sortColumn));
      }

      let result = await query;

      // Filter by sizes if provided
      if (sizes) {
        const sizeArray = (sizes as string).split(',');
        result = result.filter(product => {
          const productSizes = JSON.parse(product.sizes || '[]');
          return sizeArray.some(size => productSizes.includes(size));
        });
      }

      // Transform result to match expected Product type
      const transformedProducts: Product[] = result.map(product => ({
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

  // Order routes
  app.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    try {
      const isAdmin = req.user!.role === 'admin';
      
      let orderQuery = db.select().from(orders);
      
      if (!isAdmin) {
        orderQuery = orderQuery.where(eq(orders.userId, req.user!.id));
      }
      
      const ordersResult = await orderQuery.orderBy(desc(orders.createdAt));

      const ordersWithItems: OrderWithItems[] = await Promise.all(
        ordersResult.map(async (order) => {
          const items = await db.select({
            id: orderItems.id,
            orderId: orderItems.orderId,
            productId: orderItems.productId,
            quantity: orderItems.quantity,
            price: orderItems.price,
            size: orderItems.size,
            product: products
          })
          .from(orderItems)
          .innerJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));

          return {
            ...order,
            shippingAddress: JSON.parse(order.shippingAddress || '{}'),
            orderItems: items.map(item => ({
              ...item,
              product: {
                ...item.product,
                sizes: JSON.parse(item.product.sizes || '[]'),
                imageUrls: JSON.parse(item.product.imageUrls || '[]'),
              }
            }))
          };
        })
      );

      res.json(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post('/api/orders', requireAuth, async (req: Request, res: Response) => {
    try {
      const validation = insertOrderSchema.safeParse({
        ...req.body,
        userId: req.user!.id
      });

      if (!validation.success) {
        return res.status(400).json({ message: "Invalid order data", errors: validation.error.errors });
      }

      // Get cart items
      const cart = await db.select({
        id: cartItems.id,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        size: cartItems.size,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, req.user!.id));

      if (cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // Calculate total
      const total = cart.reduce((sum, item) => sum + (parseFloat(item.product.price.toString()) * item.quantity), 0);

      // Create order
      const orderResult = await db.insert(orders).values({
        ...validation.data,
        total: total.toString()
      }).returning();

      const order = orderResult[0];

      // Create order items
      for (const item of cart) {
        await db.insert(orderItems).values({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price.toString(),
          size: item.size || undefined
        });

        // Update product stock
        await db.update(products)
          .set({ stock: Math.max(0, item.product.stock - item.quantity) })
          .where(eq(products.id, item.productId));
      }

      // Clear cart
      await db.delete(cartItems).where(eq(cartItems.userId, req.user!.id));

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Admin order management
  app.put('/api/admin/orders/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      const result = await db.update(orders)
        .set({ status, updatedAt: new Date() })
        .where(eq(orders.id, id))
        .returning();

      if (!result.length) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(result[0]);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  // Stats for admin dashboard
  app.get('/api/admin/stats', requireAdmin, async (req: Request, res: Response) => {
    try {
      const totalProducts = await db.select().from(products).where(eq(products.isActive, true));
      const totalOrders = await db.select().from(orders);
      const totalUsers = await db.select().from(users);
      
      // Calculate total revenue
      const revenue = totalOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
      
      res.json({
        totalProducts: totalProducts.length,
        totalOrders: totalOrders.length,
        totalUsers: totalUsers.length,
        totalRevenue: revenue
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
}