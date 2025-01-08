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
