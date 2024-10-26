import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa DATABASE_URL para conectarte a Neon.tech
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones SSL como las de Neon.tech
  }
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

