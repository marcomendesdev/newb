"use server";

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function getTables() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM "restaurant-tables".tables');
    return rows;
  } finally {
    client.release();
  }
}