import { Ticket } from "lucide-react";

export default function CreateTicketPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Create Ticket</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Register a participant and generate a ticket.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8">
        <div className="flex items-center gap-3">
          <Ticket className="h-5 w-5 text-red-500" />
          <h2 className="font-medium text-white">Ticket Registration</h2>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          The ticket creation form will be connected to the category system and
          sequential ticket generator next.
        </p>
      </div>
    </div>
  );
}
