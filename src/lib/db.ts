import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function fetchTables() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM "restaurant-tables".tables');
    return rows;
  } catch (error) {
    console.error("Error fetching tables", error);
    throw new Error("Failed to fetch tables");
  } finally {
    client.release();
  }
}

export async function fetchBookings() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM "restaurant-tables".bookings');
    return rows;
  } catch (error) {
    console.error("Error fetching bookings", error);
    throw new Error("Failed to fetch bookings");
  } finally {
    client.release();
  }
}

interface Booking {
  booking_date: string;
  contact_info: string;
  customer_name: string;
  status: string;
  table_id: number;
  special_requests: string;
}

export async function createBooking({
  booking_date,
  customer_name,
  table_id,
  special_requests,
}: Booking) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "restaurant-tables".bookings (table_id, date, special_requests, created_at, updated_at, username)
      VALUES ($1, $2, $3, NOW(), NOW(), $4)
      RETURNING *;
    `;
    const values = [table_id, new Date(booking_date), special_requests, customer_name];
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating booking", error);
    throw new Error("Failed to create booking");
  } finally {
    client.release();
  }
}
