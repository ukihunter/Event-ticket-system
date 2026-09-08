import Link from "next/link";
import { Plus, Ticket } from "lucide-react";

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tickets</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage event tickets and participants.
          </p>
        </div>

        <Link
          href="/tickets/create"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Create Ticket
        </Link>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
        <Ticket className="mx-auto h-10 w-10 text-zinc-700" />
        <h2 className="mt-4 font-medium text-white">No tickets loaded</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Ticket data will be connected to the database next.
        </p>
      </div>
    </div>
  );
}
