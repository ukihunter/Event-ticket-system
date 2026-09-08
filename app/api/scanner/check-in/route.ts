import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

const checkInSchema = z.object({
  qrToken: z.string().trim().min(1, "QR token is required."),
});

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    // Only admin and category staff can scan tickets.
    if (user.role !== "ADMIN" && user.role !== "CATEGORY_STAFF") {
      return NextResponse.json(
        {
          success: false,
          message: "You are not allowed to scan tickets.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 2. Validate request body
    // --------------------------------------------------

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const parsed = checkInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "QR token is required.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { qrToken } = parsed.data;

    // --------------------------------------------------
    // 3. Find ticket
    // --------------------------------------------------

    const ticket = await prisma.ticket.findUnique({
      where: {
        qrToken,
      },
      select: {
        id: true,
        ticketNumber: true,
        participantName: true,
        qrToken: true,
        paymentStatus: true,
        checkInStatus: true,
        checkedInAt: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_QR",
          message: "Invalid QR code.",
        },
        { status: 404 },
      );
    }

    // --------------------------------------------------
    // 4. Category authorization
    // --------------------------------------------------

    if (
      user.role === "CATEGORY_STAFF" &&
      user.categoryId !== ticket.categoryId
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "CATEGORY_NOT_ALLOWED",
          message: "You are not allowed to check in this category.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 5. Check payment status
    // --------------------------------------------------

    if (ticket.paymentStatus !== "PAID") {
      return NextResponse.json(
        {
          success: false,
          code: "NOT_PAID",
          message: "This ticket has not been paid for.",
          ticket: {
            ticketNumber: ticket.ticketNumber,
            participantName: ticket.participantName,
            paymentStatus: ticket.paymentStatus,
            checkInStatus: ticket.checkInStatus,
            category: ticket.category,
          },
        },
        { status: 409 },
      );
    }

    // --------------------------------------------------
    // 6. Atomic check-in
    // --------------------------------------------------
    //
    // We only update the ticket if it is still
    // NOT_CHECKED_IN.
    //
    // This prevents the same ticket from being checked
    // in twice, even when two scanners scan it at the
    // same time.
    //

    const checkedInAt = new Date();

    const result = await prisma.$transaction(async (tx) => {
      const updatedTicket = await tx.ticket.updateMany({
        where: {
          id: ticket.id,
          checkInStatus: "NOT_CHECKED_IN",
        },
        data: {
          checkInStatus: "CHECKED_IN",
          checkedInById: user.id,
          checkedInAt,
        },
      });

      if (updatedTicket.count === 0) {
        return null;
      }

      const checkedInTicket = await tx.ticket.findUnique({
        where: {
          id: ticket.id,
        },
        select: {
          id: true,
          ticketNumber: true,
          participantName: true,
          paymentStatus: true,
          checkInStatus: true,
          checkedInAt: true,
          category: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      if (!checkedInTicket) {
        throw new Error("CHECKED_IN_TICKET_NOT_FOUND");
      }

      await tx.auditLog.create({
        data: {
          action: "TICKET_SCANNED",
          ticketId: checkedInTicket.id,
          userId: user.id,
          metadata: {
            ticketNumber: checkedInTicket.ticketNumber,
            participantName: checkedInTicket.participantName,
            category: checkedInTicket.category.code,
            paymentStatus: checkedInTicket.paymentStatus,
            checkedInAt: checkedInTicket.checkedInAt?.toISOString() ?? null,
          },
        },
      });

      return checkedInTicket;
    });

    // --------------------------------------------------
    // 7. Already checked in
    // --------------------------------------------------

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          code: "ALREADY_CHECKED_IN",
          message: "This ticket has already been checked in.",
          ticket: {
            ticketNumber: ticket.ticketNumber,
            participantName: ticket.participantName,
            paymentStatus: ticket.paymentStatus,
            checkInStatus: ticket.checkInStatus,
            checkedInAt: ticket.checkedInAt,
            category: ticket.category,
          },
        },
        { status: 409 },
      );
    }

    // --------------------------------------------------
    // 8. Successful check-in
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        code: "CHECK_IN_SUCCESS",
        message: "Ticket checked in successfully.",
        ticket: {
          id: result.id,
          ticketNumber: result.ticketNumber,
          participantName: result.participantName,
          paymentStatus: result.paymentStatus,
          checkInStatus: result.checkInStatus,
          checkedInAt: result.checkedInAt,
          category: result.category,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ticket check-in error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to check in ticket.",
      },
      { status: 500 },
    );
  }
}
