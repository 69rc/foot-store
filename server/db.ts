// Use SQLite for local development, PostgreSQL for production
import 'dotenv/config';

// Check if we're in local development mode
const isLocalDev = process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('sqlite');

if (isLocalDev) {
  // Use SQLite for local development
  const { db } = await import('./db-sqlite.js');
  export { db };
} else {
  // Use PostgreSQL for production
  import { Pool, neonConfig } from '@neondatabase/serverless';
  import { drizzle } from 'drizzle-orm/neon-serverless';
  import ws from 'ws';
  import * as schema from '@shared/schema';

  neonConfig.webSocketConstructor = ws;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL must be set. Did you forget to provision a database?',
    );
  }

  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
}
