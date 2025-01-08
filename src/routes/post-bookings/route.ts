"use server";

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function createBooking(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { booking_date, contact_info, customer_name, status, table_id } = await req.json();

  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "restaurant-tables".bookings (booking_date, contact_info, created_at, customer_name, status, table_id)
      VALUES ($1, $2, NOW(), $3, $4, $5)
      RETURNING *;
    `;
    const values = [new Date(booking_date), contact_info, customer_name, status, table_id];
    const { rows } = await client.query(query, values);
    return new Response(JSON.stringify(rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error executing query', error);
    return new Response('Failed to create booking', { status: 500 });
  } finally {
    client.release();
  }
}