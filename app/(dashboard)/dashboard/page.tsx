export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Welcome to the event ticket management system.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm text-zinc-400">Tickets Generated</p>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm text-zinc-400">Tickets Sold</p>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm text-zinc-400">Checked In</p>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm text-zinc-400">Pending Requests</p>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-lg font-semibold text-white">Category Overview</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Ticket statistics will appear here once the database is connected.
        </p>
      </div>
    </main>
  );
}
