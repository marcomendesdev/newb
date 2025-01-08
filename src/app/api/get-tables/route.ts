import { fetchTables } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tables = await fetchTables();
    return NextResponse.json({ success: true, tables });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
