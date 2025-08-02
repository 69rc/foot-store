import {
  sqliteTable,
  text,
  integer,
  real,
  blob,
  index,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table (required for local auth)
export const sessions = sqliteTable(
  "sessions",
  {
    sid: text("sid").primaryKey(),
    sess: text("sess").notNull(),
    expire: integer("expire", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    expireIdx: index("IDX_session_expire").on(table.expire),
  }),
);

// User storage table
export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  role: text("role", { enum: ["customer", "admin"] }).default("customer").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Products table
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  description: text("description"),
  price: real("price").notNull(),
  category: text("category", { enum: ["men", "women", "kids", "sports"] }).notNull(),
  sizes: text("sizes").default("[]"), // JSON string
  stock: integer("stock").default(0),
  imageUrl: text("image_url"),
  imageUrls: text("image_urls").default("[]"), // JSON string
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Orders table
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id).notNull(),
  status: text("status", { enum: ["pending", "processing", "shipped", "delivered", "cancelled"] }).default("pending"),
  total: real("total").notNull(),
  shippingAddress: text("shipping_address"), // JSON string
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Order items table
export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),
  size: text("size", { length: 10 }),
});

// Cart items table
export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  size: text("size", { length: 10 }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cartItems: many(cartItems),
}));

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  cartItems: many(cartItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

// Schema definitions
export const insertUserSchema = createInsertSchema(users);
export const insertProductSchema = createInsertSchema(products).extend({
  price: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  sizes: z.union([z.string(), z.array(z.string())]).transform((val) => 
    typeof val === 'string' ? val : JSON.stringify(val)
  ),
  imageUrls: z.union([z.string(), z.array(z.string())]).transform((val) => 
    typeof val === 'string' ? val : JSON.stringify(val)
  ),
});
export const insertOrderSchema = createInsertSchema(orders).extend({
  shippingAddress: z.any().transform((val) => typeof val === 'string' ? val : JSON.stringify(val)),
});
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const insertCartItemSchema = createInsertSchema(cartItems);

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect & {
  sizes: string[];
  imageUrls: string[];
};
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect & {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Extended types for API responses
export type OrderWithItems = Order & {
  orderItems: (OrderItem & { product: Product })[];
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};