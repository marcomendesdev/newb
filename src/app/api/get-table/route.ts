"use server";

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const client = await pool.connect();
  try {
    const query = 'SELECT id, name, capacity, location FROM "restaurant-tables".tables WHERE id = $1';
    const values = [id];
    const { rows } = await client.query(query, values);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching table:', error);
    return NextResponse.json({ error: 'Failed to fetch table', details: (error as Error).message }, { status: 500 });
  } finally {
    client.release();
  }
}