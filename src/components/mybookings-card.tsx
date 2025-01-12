import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Booking {
  table_id: string;
  username: string;
  date: string | Date;
}

interface MyBookingsCardProps {
  bookings: Booking[];
}

export default function MyBookingsCard({ bookings }: MyBookingsCardProps) {
  return (
    <>
      {bookings &&
        bookings.map((booking, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Table: {booking.table_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Guest name: {booking.username}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Time: {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </CardContent>
            <CardFooter>
              <button>Cancel</button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}