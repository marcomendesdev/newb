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
  const { id, email } = await req.json();

  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "restaurant-tables".users (id, email, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    const values = [id, email];
    const { rows } = await client.query(query, values);
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Error executing query', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  } finally {
    client.release();
  }
}