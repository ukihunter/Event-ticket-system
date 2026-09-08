import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    tickets: [],
  });
}

export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Ticket creation API not implemented yet.",
  });
}
