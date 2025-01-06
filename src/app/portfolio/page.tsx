import TablesList from '@/components/tables-list';
import { BookingsProvider } from '@/context/bookings-context';

export default function Portfolio() {
  return (
    <BookingsProvider>
     <TablesList />
   </BookingsProvider>
  );
}
