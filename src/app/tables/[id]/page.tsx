import BookingCard from "@/components/booking-card";
import { BookingsProvider } from "@/context/bookings-context";
// import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>
  
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const id = (await params).id;
//   return {
//     title: `Booking for ${id}`,
//   };
// }

export default async function BookTable({ params }: Props) {
  const id = (await params).id;
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
