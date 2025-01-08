import BookingCard from "@/components/booking-card";

export default function BookTable() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold py-12">Book a table</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 py-12">
            <BookingCard />
        </div>
      </main>
    </div>
  );
}
