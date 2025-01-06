"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import getTables from "@/services/get-tables";
import getBookings from "@/services/get-bookings";


interface TableType {
  
  id: number;
  name: string;
  capacity: number;
  // Add other fields as necessary
}

interface BookingsContextType {
  bookings: TableType[] | null;
  setBookings: React.Dispatch<React.SetStateAction<TableType[] | null>>;
}

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined
);

interface BookingsProviderProps {
  children: React.ReactNode;
}

export function BookingsProvider({ children }: BookingsProviderProps) {
  const [bookings, setBookings] = useState<TableType[] | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      const data = await getTables();
      const bookings = await getBookings();
      console.log("bookings", bookings);
      
      console.log("Fetched bookings:", data); // Add this line for debugging
      setBookings(data);
    }
    fetchBookings();
  }, []);

  return (
    <BookingsContext.Provider value={{ bookings, setBookings }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
}
