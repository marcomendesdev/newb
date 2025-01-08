"use server";

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: NextRequest) {
  const { booking_date, contact_info, customer_name, status, table_id, special_requests } = await req.json();

  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "restaurant-tables".bookings (booking_date, contact_info, created_at, customer_name, status, table_id, special_requests)
      VALUES ($1, $2, NOW(), $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [new Date(booking_date), contact_info, customer_name, status, table_id, special_requests];
    const { rows } = await client.query(query, values);
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  } finally {
    client.release();
  }
}