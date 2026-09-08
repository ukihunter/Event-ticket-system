import Link from "next/link";
import { Plus, Ticket } from "lucide-react";

import { requireCategoryStaff } from "@/lib/auth-helpers";

export default async function TicketsPage() {
  const user = await requireCategoryStaff();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tickets</h1>

          <p className="mt-1 text-sm text-zinc-500">
            Create and manage event tickets.
          </p>
        </div>

        <Link
          href="/tickets/create"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Create Ticket
        </Link>
      </div>

      {/* Empty state */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900">
          <Ticket className="h-7 w-7 text-zinc-500" />
        </div>

        <h2 className="mt-4 text-lg font-medium text-white">No tickets yet</h2>

        <p className="mt-1 max-w-sm text-center text-sm text-zinc-500">
          Create the first ticket for the event.
        </p>

        <Link
          href="/tickets/create"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-700 px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900"
        >
          <Plus className="h-4 w-4" />
          Create Ticket
        </Link>
      </div>
    </div>
  );
}
