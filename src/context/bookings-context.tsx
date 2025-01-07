"use client";

import React, { createContext, useContext } from "react";

interface TableType {
  id: number;
  name: string;
  capacity: number;
}

interface BookingsContextType {
  bookings: TableType[] | null;
}

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined
);

interface BookingsProviderProps {
  children: React.ReactNode;
  initialBookings: TableType[];
}

export function BookingsProvider({ children, initialBookings }: BookingsProviderProps) {
  return (
    <BookingsContext.Provider value={{ bookings: initialBookings }}>
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
