import BookingCard from "@/components/booking-card";
import { BookingsProvider } from "@/context/bookings-context";

export type paramsType = Promise<{ id: string }>;
export default async function BookTable(props: { params: paramsType }) {
  const { id } = await props.params;
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 py-12">
          <BookingsProvider initialBookings={[]}>
            <BookingCard id={id}  />
            <pre>{id}</pre>
          </BookingsProvider>
        </div>
      </main>
    </div>
  );
}
