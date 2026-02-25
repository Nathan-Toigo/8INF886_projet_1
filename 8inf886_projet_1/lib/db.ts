import mysql from 'mysql2/promise';

// This prevents TypeScript from complaining about the global property
const globalForPool = global as unknown as { pool: mysql.Pool };

export const pool =
  globalForPool.pool ||
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Helps with certain MySQL server timeouts
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool;