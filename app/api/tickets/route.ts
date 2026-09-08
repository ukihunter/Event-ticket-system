import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth-helpers";

import { prisma } from "@/lib/prisma";
import { createTicket } from "@/lib/ticket-service";

const createTicketSchema = z.object({
  participantName: z
    .string()
    .trim()
    .min(2, "Participant name is required.")
    .max(150, "Participant name is too long."),

  categoryId: z.string().cuid("Invalid category."),
});

export async function POST(request: Request) {
  try {
    // ----------------------------------------------------------
    // Authentication
    // ----------------------------------------------------------

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    // ----------------------------------------------------------
    // Parse request
    // ----------------------------------------------------------

    const body = await request.json();

    const parsed = createTicketSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
          errors: parsed.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const { participantName, categoryId } = parsed.data;

    // ----------------------------------------------------------
    // Category authorization
    // ----------------------------------------------------------

    if (user.role === "CATEGORY_STAFF" && user.categoryId !== categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only create tickets for your own category.",
        },
        {
          status: 403,
        },
      );
    }

    // ----------------------------------------------------------
    // Verify category exists
    // ----------------------------------------------------------

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    // ----------------------------------------------------------
    // Create ticket
    // ----------------------------------------------------------

    const ticket = await createTicket({
      participantName,
      categoryId,
      createdById: user.id,
    });

    return NextResponse.json(
      {
        success: true,

        ticket: {
          id: ticket.id,
          ticketNumber: ticket.ticketNumber,
          participantName: ticket.participantName,
          qrToken: ticket.qrToken,
          paymentStatus: ticket.paymentStatus,
          checkInStatus: ticket.checkInStatus,
          category: {
            id: ticket.category.id,
            name: ticket.category.name,
            code: ticket.category.code,
          },
          createdAt: ticket.createdAt,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create ticket error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create ticket.",
      },
      {
        status: 500,
      },
    );
  }
}
