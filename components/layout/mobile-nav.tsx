"use client";

import { Menu, Ticket } from "lucide-react";

export function MobileNav() {
  return (
    <header className="flex h-16 items-center border-b border-zinc-800 bg-zinc-950 px-4 md:hidden">
      <button
        type="button"
        className="mr-4 rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
          <Ticket className="h-4 w-4 text-white" />
        </div>

        <span className="font-semibold">Event Tickets</span>
      </div>
    </header>
  );
}
