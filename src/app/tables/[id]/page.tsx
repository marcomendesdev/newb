import BookingCard from "@/components/booking-card";
import { BookingsProvider } from "@/context/bookings-context";
import { fetchTableById } from "@/lib/db";

export default function BookTable({params}: {params: {id: string}}) {
    const { id } = params;
    const table = fetchTableById(id);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 py-12">
          <BookingsProvider initialBookings={[]}>
            <BookingCard table={table} />
            <pre>{table}</pre>
          </BookingsProvider>
        </div>
      </main>
    </div>
  );
}
