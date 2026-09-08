import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

const querySchema = z.object({
  categoryId: z.string().cuid("Invalid category."),
});

export async function GET(request: Request) {
  try {
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

    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      categoryId: searchParams.get("categoryId"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category.",
        },
        { status: 400 },
      );
    }

    const { categoryId } = parsed.data;

    // Category staff can only preview their own category.
    if (user.role === "CATEGORY_STAFF" && user.categoryId !== categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only view the next number for your own category.",
        },
        { status: 403 },
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        code: true,
        ticketSequence: {
          select: {
            nextNumber: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        { status: 404 },
      );
    }

    const nextNumber = category.ticketSequence?.nextNumber ?? 1;

    const ticketNumber = `${category.code}${nextNumber.toString().padStart(3, "0")}`;

    return NextResponse.json({
      success: true,
      ticketNumber,
      nextNumber,
      category: {
        id: category.id,
        name: category.name,
        code: category.code,
      },
    });
  } catch (error) {
    console.error("Get next ticket number error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get the next ticket number.",
      },
      { status: 500 },
    );
  }
}
