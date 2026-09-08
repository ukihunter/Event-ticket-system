import Link from "next/link";
import {
  LayoutDashboard,
  Ticket,
  ScanLine,
  ClipboardList,
  Users,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },

  {
    label: "Scanner",
    href: "/scanner",
    icon: ScanLine,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-800 bg-zinc-950 md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <Ticket className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="font-semibold text-white">Event Tickets</p>
              <p className="text-xs text-zinc-500">Management System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <p className="text-xs text-zinc-600">Event Ticket System</p>
        </div>
      </div>
    </aside>
  );
}
