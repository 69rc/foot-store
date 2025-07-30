import fetch, { Response, Request, Headers } from 'node-fetch';
globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Response = Response;
globalThis.Request = Request;

import express, { type Request as ExpRequest, Response as ExpResponse, NextFunction } from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Logging middleware for API routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Start the server
(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: ExpRequest, res: ExpResponse, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Vite integration (only in development)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Port and host
  const port = parseInt(process.env.PORT || "5001", 10);
  const host = process.env.HOST || "127.0.0.1";

  // ✅ Use standard listen signature to avoid ENOTSUP error
  server.listen(port, host, () => {
    log(`✅ Server running on http://${host}:${port}`);
  });
})();
