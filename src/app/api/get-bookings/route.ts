"use server";

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function getBookings() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM "restaurant-tables".bookings');
    return rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Failed to fetch bookings');
  } finally {
    client.release();
  }
}