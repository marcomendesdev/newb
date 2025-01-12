import MyBookingsCard from "@/components/mybookings-card";
import { fetchBookingsByUser } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function MyBookings() {
  const user = await currentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const booking = await fetchBookingsByUser(user.id);
  console.log("Booking", booking);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold py-12">My Bookings</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-20">
          <MyBookingsCard bookings={booking} />
        </div>
      </main>
    </div>
  );
}
