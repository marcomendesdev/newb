import TablesList from "@/components/tables-list";
import { BookingsProvider } from "@/context/bookings-context";
import getTables from "@/app/api/get-tables/route";
import getBookings from "@/app/api/get-bookings/route";

export default async function Tables() {
  const tables = await getTables(); // Fetch on the server
  const bookings = await getBookings(); // Fetch on the server
  console.log("Fetched data:", tables, bookings);

  return (
    <BookingsProvider initialBookings={tables}>
      <TablesList />
    </BookingsProvider>
  );
}
