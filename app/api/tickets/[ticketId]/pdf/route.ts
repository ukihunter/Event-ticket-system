import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    ticketId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { ticketId } = await params;

  return NextResponse.json({
    success: false,
    ticketId,
    message: "PDF generation will be implemented after the ticket system.",
  });
}
