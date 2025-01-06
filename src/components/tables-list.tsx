"use client";

import { useBookings } from "@/context/bookings-context";

export default function TablesList() {
  const {bookings} = useBookings();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Tables</h1>
        <>
          {bookings &&
            bookings.map((booking) => (
              <div key={booking.id}>
                <h1>{booking.capacity}</h1>
              </div>
            ))}
        </>
      </main>
    </div>
  );
}
