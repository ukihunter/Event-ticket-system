import { Ticket } from "lucide-react";

type PublicTicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function PublicTicketPage({
  params,
}: PublicTicketPageProps) {
  const { ticketId } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
          <Ticket className="h-6 w-6 text-white" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-white">Event Ticket</h1>

        <p className="mt-2 text-sm text-zinc-500">Ticket verification</p>

        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Ticket Token
          </p>
          <p className="mt-2 break-all font-mono text-sm text-zinc-300">
            {ticketId}
          </p>
        </div>

        <p className="mt-5 text-sm text-zinc-600">
          Ticket information will be loaded from the database.
        </p>
      </div>
    </main>
  );
}
