"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import { toast } from "sonner";

interface Booking {
  table_id: string;
  username: string;
  date: string | Date;
  id: string;
  guests: number;
  special_requests: string;
}

interface MyBookingsCardProps {
  bookings: Booking[];
}

export default function MyBookingsCard({ bookings }: MyBookingsCardProps) {
  const [currentBookings, setCurrentBookings] = useState(bookings);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/delete-bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      setCurrentBookings(
        currentBookings.filter((booking) => booking.id !== id)
      );
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  return (
    <>
      {currentBookings &&
        currentBookings.map((booking, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Table: {booking.table_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Guest name: {booking.username}</p>
              <p>Guests: {booking.guests}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>
                Time:{" "}
                {new Date(booking.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>Special requests: {booking.special_requests}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleDelete(booking.id)}>
                Delete this booking
              </Button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}
