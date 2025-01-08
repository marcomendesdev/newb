"use client";

import { useBookings } from "@/context/bookings-context";
import TableCard from "./table-card";

export default function TablesList() {
  const { bookings } = useBookings();
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold py-12">Tables</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookings &&
            bookings.map((booking) => (
              <TableCard
                key={booking.id}
                name={booking.name}
                capacity={booking.capacity}
                location={booking.location}
                onBook={() => alert("Booking table...")}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
