import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    ticketId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { ticketId } = await params;

  return NextResponse.json({
    success: true,
    ticketId,
  });
}

export async function PATCH(_request: Request, { params }: RouteContext) {
  const { ticketId } = await params;

  return NextResponse.json({
    success: true,
    ticketId,
    message: "Ticket update API not implemented yet.",
  });
}
