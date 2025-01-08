import { fetchBookings } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bookings = await fetchBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
