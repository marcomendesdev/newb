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
  try {
    const { id, date, special_requests, username, guests, table_id } = await req.json();
    console.log('Received data:', { id, date, special_requests, username, guests, table_id });

    const client = await pool.connect();
    try {
      const query = `
        UPDATE "restaurant-tables".bookings
        SET date = $1, special_requests = $2, username = $3, guests = $4, table_id = $5, updated_at = NOW()
        WHERE id = $6
        RETURNING *;
      `;
      const values = [new Date(date), special_requests, username, guests, table_id, id];
      console.log('Executing query:', query, 'with values:', values);
      const { rows } = await client.query(query, values);
      console.log('Query result:', rows);

      if (rows.length === 0) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      return NextResponse.json(rows[0], { status: 200 });
    } catch (queryError) {
      if (queryError instanceof Error) {
        console.error('Error executing query', queryError.message, queryError.stack);
      } else {
        console.error('Unknown error executing query', queryError);
      }
      return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error processing request', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}