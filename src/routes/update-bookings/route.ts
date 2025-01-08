"use server";

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function updateBooking(req: Request) {
  if (req.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { id, booking_date, contact_info, customer_name, status, table_id } = await req.json();

  const client = await pool.connect();
  try {
    const query = `
      UPDATE "restaurant-tables".bookings
      SET booking_date = $1, contact_info = $2, customer_name = $3, status = $4, table_id = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const values = [new Date(booking_date), contact_info, customer_name, status, table_id, id];
    const { rows } = await client.query(query, values);
    if (rows.length === 0) {
      return new Response('Booking not found', { status: 404 });
    }
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error executing query', error);
    return new Response('Failed to update booking', { status: 500 });
  } finally {
    client.release();
  }
}