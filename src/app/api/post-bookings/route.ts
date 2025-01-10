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
  try {
    const { id, user_id, table_id, date, special_requests, username, guests } = await req.json();
    console.log('Received data:', { id, user_id, table_id, date, special_requests, username, guests });

    const client = await pool.connect();
    try {
      // Check if user_id exists in the referenced table
      const userCheckQuery = 'SELECT 1 FROM "restaurant-tables".users WHERE id = $1';
      const userCheckResult = await client.query(userCheckQuery, [user_id]);
      if (userCheckResult.rowCount === 0) {
        return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
      }

      const query = `
        INSERT INTO "restaurant-tables".bookings (id, user_id, table_id, date, special_requests, created_at, updated_at, username, guests)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7)
        RETURNING *;
      `;
      const values = [id, user_id, table_id, date, special_requests, username, guests];
      console.log('Executing query:', query, 'with values:', values);
      const { rows } = await client.query(query, values);
      console.log('Query result:', rows);
      return NextResponse.json(rows[0], { status: 201 });
    } catch (queryError) {
      if (queryError instanceof Error) {
        console.error('Error executing query', queryError.message, queryError.stack);
      } else {
        console.error('Error executing query', queryError);
      }
      const errorMessage = queryError instanceof Error ? queryError.message : 'Unknown error';
      return NextResponse.json({ error: 'Failed to create booking', details: errorMessage }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (jsonError) {
    if (jsonError instanceof Error) {
      console.error('Error parsing JSON', jsonError.message, jsonError.stack);
    } else {
      console.error('Error parsing JSON', jsonError);
    }
    const errorMessage = jsonError instanceof Error ? jsonError.message : 'Unknown error';
    return NextResponse.json({ error: 'Invalid request payload', details: errorMessage }, { status: 400 });
  }
}