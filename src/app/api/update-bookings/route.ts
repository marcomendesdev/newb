"use server";

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function PUT(req: NextRequest) {
  const { id, booking_date, contact_info, customer_name, status, table_id, special_requests } = await req.json();

  const client = await pool.connect();
  try {
    const query = `
      UPDATE "restaurant-tables".bookings
      SET booking_date = $1, contact_info = $2, customer_name = $3, status = $4, table_id = $5, special_requests = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING *;
    `;
    const values = [new Date(booking_date), contact_info, customer_name, status, table_id, special_requests, id];
    const { rows } = await client.query(query, values);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  } finally {
    client.release();
  }
}