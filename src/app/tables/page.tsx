import TablesList from "@/components/tables-list";
import { BookingsProvider } from "@/context/bookings-context";
import { fetchTables, fetchBookings } from "@/lib/db";

export default async function Tables() {
  const tables = await fetchTables(); // Fetch directly from the database
  const bookings = await fetchBookings(); // Fetch directly from the database
  console.log("Fetched data:", tables, bookings);

  return (
    <BookingsProvider initialBookings={bookings}>
      <TablesList tables={tables} />
    </BookingsProvider>
  );
}