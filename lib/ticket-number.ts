import { prisma } from "@/lib/prisma";
import type { CategoryCode } from "@/app/generated/prisma/client";

export async function generateTicketNumber(
  categoryId: string,
  categoryCode: CategoryCode,
): Promise<string> {
  const sequence = await prisma.ticketSequence.upsert({
    where: {
      categoryId,
    },
    create: {
      categoryId,
      nextNumber: 2,
    },
    update: {
      nextNumber: {
        increment: 1,
      },
    },
    select: {
      nextNumber: true,
    },
  });

  const number = sequence.nextNumber - 1;

  return `${categoryCode}${String(number).padStart(3, "0")}`;
}
